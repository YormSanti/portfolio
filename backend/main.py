from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import json
import os
from typing import List, Optional

app = FastAPI(
    title="Alex Rivera Portfolio API",
    description="Backend API for managing portfolio projects, status, and contact messages.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# File to store contact messages
DB_FILE = os.path.join(os.path.dirname(__file__), "messages.json")

# Data Models
class Project(BaseModel):
    id: str
    title: str
    category: str
    image: str
    description: str
    client: str
    date: str
    stack: List[str]
    demo: str
    repo: str

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=150)
    message: str = Field(..., min_length=10, max_length=2000)

class DeveloperStatus(BaseModel):
    available: bool
    status_text: str

# In-Memory Project Database (matches our original frontend mockup)
PROJECTS_DATABASE = [
    Project(
        id="1",
        title="Nexa AI Analytics Dashboard",
        category="Web Application",
        image="/images/dashboard.jpg",
        description="Nexa is an immersive SaaS analytics platform mapping complex artificial intelligence infrastructure. Built for enterprise devops and ML engineers, Nexa displays GPU utilization, token counts, system temperature, API request volumes, and active billing tiers in real time. It features a complete custom component system, highly performant glassmorphic graphs, customizable visual themes, and strict Web Accessibility Initiative (WAI-ARIA) validation.",
        client="Nexa Corp Inc.",
        date="June 2025",
        stack=["React", "TypeScript", "Chart.js", "HTML5", "Sass (SCSS)", "Vercel"],
        demo="#",
        repo="#"
    ),
    Project(
        id="2",
        title="Odyssey Immersive Travel Guide",
        category="Mobile App UI",
        image="/images/mobile.jpg",
        description="Odyssey transforms typical travel planning into a sensory interactive story. Designed for tablets and mobile devices, Odyssey acts as a digital curator, using high-definition imagery and regional soundscapes to map historical sites in Kyoto, Paris, and Bali. The UI blends subtle, smooth parallax scrolls, dark premium backgrounds, and optimized SVG micro-animations, providing a highly premium exploration interface.",
        client="Odyssey Travel Ltd.",
        date="Feb 2024",
        stack=["Figma", "React Native", "Lottie Animation", "SVG", "TailwindCSS"],
        demo="#",
        repo="#"
    ),
    Project(
        id="3",
        title="Aura Automotive Configurator",
        category="3D & Creative Engineering",
        image="/images/web3d.jpg",
        description="Aura Automotive is an elite vehicle configurator allowing luxury buyers to customize electric sports cars. Integrated with Three.js web rendering, users can customize body materials, paint reflections, wheel rims, and interior stitching in real time. Optimized GLTF loading systems, custom metalness/roughness shaders, and GreenSock Animation Platform (GSAP) timelines create cinematic transition cameras and incredibly smooth, state-of-the-art UI sliders.",
        client="Aura Motors LLC",
        date="November 2024",
        stack=["Three.js", "WebGL Shaders", "GSAP", "HTML5 Canvas", "Node.js"],
        demo="#",
        repo="#"
    )
]

@app.get("/", tags=["General"])
def read_root():
    return {
        "message": "Welcome to the Alex Rivera Portfolio API!",
        "docs_url": "/docs",
        "status_url": "/api/status",
        "projects_url": "/api/projects"
    }

@app.get("/api/status", response_model=DeveloperStatus, tags=["Status"])
def get_developer_status():
    return DeveloperStatus(
        available=True,
        status_text="Available for Freelance & Contracts"
    )

@app.get("/api/projects", response_model=List[Project], tags=["Projects"])
def get_projects(category: Optional[str] = None):
    if category:
        filtered = [p for p in PROJECTS_DATABASE if category.lower() in p.category.lower() or category.lower() in p.id]
        return filtered
    return PROJECTS_DATABASE

@app.post("/api/contact", status_code=status.HTTP_201_CREATED, tags=["Contact"])
def post_contact_message(message: ContactMessage):
    # Load existing messages
    messages = []
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r") as f:
                messages = json.load(f)
        except json.JSONDecodeError:
            pass

    # Save new message
    new_msg = message.dict()
    import datetime
    new_msg["timestamp"] = datetime.datetime.utcnow().isoformat()
    messages.append(new_msg)

    with open(DB_FILE, "w") as f:
        json.dump(messages, f, indent=4)

    return {
        "status": "success",
        "message": f"Thank you, {message.name}! Your message has been recorded."
    }
