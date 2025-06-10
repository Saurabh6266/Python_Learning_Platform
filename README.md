# PyLearn - Python Learning Platform

A comprehensive Python learning platform with structured curriculum, coding challenges, and progress tracking.

## Features

- **Interactive Learning Stages**: Beginner, Intermediate, and Advanced levels
- **Hands-on Lessons**: Step-by-step tutorials with code examples
- **Coding Problems**: LeetCode and HackerRank challenges integrated
- **Project Recommendations**: Real-world projects to build your portfolio
- **Progress Tracking**: XP system and completion tracking
- **Username-based Authentication**: Simple login system

## Two Deployment Options

### Option 1: React/Node.js Application (Current)

This is a full-stack web application built with React, Node.js, and Express.

**Features:**
- Interactive code editor modal
- Real-time progress updates
- Session-based authentication
- Modern responsive UI

**To run locally:**
```bash
npm install
npm run dev
```

**Deployment Options:**
- Replit Deployments
- Vercel
- Netlify
- Heroku

### Option 2: Streamlit Application

A simplified version built specifically for Streamlit Cloud deployment.

**Features:**
- Username-based login
- Interactive lessons with code examples
- Problem-solving interface
- Project recommendations
- Progress tracking in sidebar

**Files for Streamlit deployment:**
- `streamlit_app.py` - Main application
- `streamlit_requirements.txt` - Dependencies

## Streamlit Cloud Deployment

To deploy on Streamlit Cloud:

1. **Create a GitHub Repository**
   - Upload `streamlit_app.py` and `streamlit_requirements.txt`
   - Ensure these files are in the root directory

2. **Connect to Streamlit Cloud**
   - Go to [share.streamlit.io](https://share.streamlit.io)
   - Connect your GitHub account
   - Select your repository
   - Set main file path to `streamlit_app.py`

3. **Deploy**
   - Streamlit Cloud will automatically detect dependencies
   - Your app will be available at `https://[your-app-name].streamlit.app`

## Data Structure

The platform includes:
- **Learning Stages**: Structured progression from beginner to advanced
- **Lessons**: Interactive content with code examples
- **Problems**: Coding challenges with difficulty levels
- **Projects**: Hands-on application projects
- **User Progress**: XP points and completion tracking

## Sample Data

The platform comes with pre-loaded content including:
- Object-Oriented Programming lessons
- LeetCode problems (Two Sum, Valid Parentheses, etc.)
- Project ideas (Todo App, Banking System)
- Progress tracking for demonstration

## Authentication

Simple username-based authentication:
- Users can log in with any username
- New users are automatically created
- Session persistence in both versions
- Logout functionality included

## Getting Started

1. **For React Version**: Access the login page and enter any username
2. **For Streamlit Version**: Run `streamlit run streamlit_app.py` locally or deploy to Streamlit Cloud

The platform will guide you through the learning journey with structured content and progress tracking.