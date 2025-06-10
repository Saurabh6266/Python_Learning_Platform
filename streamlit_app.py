import streamlit as st
import json
import os
from datetime import datetime
from typing import Dict, List, Optional

# Configure Streamlit page
st.set_page_config(
    page_title="PyLearn - Python Learning Platform",
    page_icon="🐍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Data structures
class User:
    def __init__(self, username: str, name: str, points: int = 0):
        self.username = username
        self.name = name
        self.points = points

class LearningStage:
    def __init__(self, id: int, name: str, level: int, description: str, 
                 total_lessons: int, completed_lessons: int = 0, is_unlocked: bool = False):
        self.id = id
        self.name = name
        self.level = level
        self.description = description
        self.total_lessons = total_lessons
        self.completed_lessons = completed_lessons
        self.is_unlocked = is_unlocked

class Lesson:
    def __init__(self, id: int, stage_id: int, title: str, description: str, 
                 content: str, duration: int, order: int, is_completed: bool = False):
        self.id = id
        self.stage_id = stage_id
        self.title = title
        self.description = description
        self.content = content
        self.duration = duration
        self.order = order
        self.is_completed = is_completed

class Problem:
    def __init__(self, id: int, stage_id: int, title: str, description: str,
                 difficulty: str, tags: List[str], source: str, source_url: str = None,
                 is_completed: bool = False):
        self.id = id
        self.stage_id = stage_id
        self.title = title
        self.description = description
        self.difficulty = difficulty
        self.tags = tags
        self.source = source
        self.source_url = source_url
        self.is_completed = is_completed

class Project:
    def __init__(self, id: int, stage_id: int, title: str, description: str,
                 difficulty: str, estimated_time: int, skills: List[str],
                 is_completed: bool = False):
        self.id = id
        self.stage_id = stage_id
        self.title = title
        self.description = description
        self.difficulty = difficulty
        self.estimated_time = estimated_time
        self.skills = skills
        self.is_completed = is_completed

# Initialize data
@st.cache_data
def load_sample_data():
    stages = [
        LearningStage(1, "Beginner", 1, "Python basics, syntax, and fundamental concepts", 8, 8, True),
        LearningStage(2, "Intermediate", 2, "Object-oriented programming, data structures, and algorithms", 12, 8, True),
        LearningStage(3, "Advanced", 3, "Advanced topics, frameworks, and professional development", 15, 0, False),
    ]
    
    lessons = [
        Lesson(1, 2, "Classes and Objects Fundamentals", 
               "Learn how to create classes, instantiate objects, and understand the relationship between them.",
               """# Classes and Objects in Python

## What are Classes?
A class is a blueprint for creating objects. It defines the attributes and methods that objects of that type will have.

## Creating a Class
```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
    
    def bark(self):
        return f"{self.name} says Woof!"

# Creating objects
my_dog = Dog("Buddy", "Golden Retriever")
print(my_dog.bark())  # Output: Buddy says Woof!
```

## Key Concepts
- **Class**: Blueprint for objects
- **Object**: Instance of a class
- **Attributes**: Variables that belong to an object
- **Methods**: Functions that belong to a class
""", 25, 1, True),
        
        Lesson(2, 2, "Methods and Attributes",
               "Understand instance methods, class methods, static methods, and different types of attributes.",
               """# Methods and Attributes

## Instance Methods
Methods that operate on instance data:
```python
class Circle:
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
```

## Class Methods
Methods that operate on class data:
```python
class Counter:
    count = 0
    
    @classmethod
    def increment(cls):
        cls.count += 1
```

## Static Methods
Methods that don't access instance or class data:
```python
class MathUtils:
    @staticmethod
    def add(x, y):
        return x + y
```
""", 30, 2, False),
        
        Lesson(3, 2, "Inheritance and Polymorphism",
               "Explore inheritance relationships, method overriding, and polymorphic behavior in Python.",
               """# Inheritance and Polymorphism

## Inheritance
Create new classes based on existing ones:
```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"
```

## Polymorphism
Same interface, different implementations:
```python
animals = [Dog("Buddy"), Cat("Whiskers")]
for animal in animals:
    print(animal.speak())
```
""", 35, 3, False),
    ]
    
    problems = [
        Problem(1, 2, "Two Sum", 
                "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                "Easy", ["Array", "Hash Table"], "LeetCode", "https://leetcode.com/problems/two-sum/", True),
        
        Problem(2, 2, "Valid Parentheses",
                "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
                "Easy", ["String", "Stack"], "LeetCode", "https://leetcode.com/problems/valid-parentheses/", False),
        
        Problem(3, 2, "Longest Substring Without Repeating Characters",
                "Given a string s, find the length of the longest substring without repeating characters.",
                "Medium", ["Hash Table", "Sliding Window"], "LeetCode", 
                "https://leetcode.com/problems/longest-substring-without-repeating-characters/", False),
    ]
    
    projects = [
        Project(1, 2, "Object-Oriented Todo App",
                "Build a todo application using classes for Task, TodoList, and User management with file persistence.",
                "Beginner", 2, ["Classes", "File I/O", "Data Management"], False),
        
        Project(2, 2, "Banking System Simulator",
                "Create a banking system with Account, SavingsAccount, and CheckingAccount classes demonstrating inheritance.",
                "Intermediate", 4, ["Inheritance", "Polymorphism", "Error Handling"], False),
    ]
    
    return stages, lessons, problems, projects

def initialize_session_state():
    if 'user' not in st.session_state:
        st.session_state.user = None
    if 'stages' not in st.session_state:
        st.session_state.stages, st.session_state.lessons, st.session_state.problems, st.session_state.projects = load_sample_data()

def login_page():
    st.markdown("""
    <div style="text-align: center; padding: 2rem;">
        <h1>🐍 PyLearn</h1>
        <p style="font-size: 1.2rem; color: #666;">Start your Python learning journey</p>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col2:
        st.markdown("### Welcome to PyLearn!")
        st.info("👋 New to PyLearn? Just enter any username to get started!")
        
        with st.form("login_form"):
            username = st.text_input("Username", placeholder="Enter your username")
            submitted = st.form_submit_button("Continue Learning", use_container_width=True)
            
            if submitted and username:
                name = username.capitalize()
                points = 1250 if username.lower() == "johndoe" else 0
                st.session_state.user = User(username, name, points)
                st.rerun()
            elif submitted:
                st.error("Please enter a username")
        
        st.markdown("""
        <div style="margin-top: 2rem; text-align: center;">
            <span style="background: #e3f2fd; padding: 0.5rem; border-radius: 1rem; margin: 0.25rem; font-size: 0.8rem;">Beginner Friendly</span>
            <span style="background: #e8f5e8; padding: 0.5rem; border-radius: 1rem; margin: 0.25rem; font-size: 0.8rem;">Interactive Coding</span>
            <span style="background: #f3e5f5; padding: 0.5rem; border-radius: 1rem; margin: 0.25rem; font-size: 0.8rem;">Progress Tracking</span>
        </div>
        """, unsafe_allow_html=True)

def main_app():
    # Header
    col1, col2, col3 = st.columns([2, 1, 1])
    
    with col1:
        st.markdown("# 🐍 PyLearn")
    
    with col2:
        st.markdown(f"**🏆 {st.session_state.user.points} XP**")
    
    with col3:
        if st.button("Logout", use_container_width=True):
            st.session_state.user = None
            st.rerun()
    
    # Sidebar - Progress tracking
    with st.sidebar:
        st.markdown("## Your Progress")
        
        # Overall progress
        overall_progress = 65
        st.markdown(f"**Overall Progress: {overall_progress}%**")
        st.progress(overall_progress / 100)
        
        # Learning stages
        st.markdown("### Learning Stages")
        for stage in st.session_state.stages:
            if stage.completed_lessons == stage.total_lessons and stage.total_lessons > 0:
                status = f"✅ Completed"
                color = "#4caf50"
            elif stage.is_unlocked and stage.completed_lessons > 0:
                status = f"🔄 In Progress ({stage.completed_lessons}/{stage.total_lessons})"
                color = "#2196f3"
            else:
                status = "🔒 Locked"
                color = "#9e9e9e"
            
            st.markdown(f"""
            <div style="border-left: 4px solid {color}; padding: 0.5rem; margin: 0.5rem 0;">
                <strong>{stage.name}</strong><br>
                <small style="color: {color};">{status}</small>
            </div>
            """, unsafe_allow_html=True)
        
        # Quick stats
        st.markdown("### Quick Stats")
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Problems Solved", 47)
        with col2:
            st.metric("Projects Done", 3)
    
    # Main content
    st.markdown("---")
    
    # Current module header
    current_stage = next((s for s in st.session_state.stages if s.level == 2), None)
    
    if current_stage:
        st.markdown(f"""
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    padding: 2rem; border-radius: 1rem; color: white; margin-bottom: 2rem;">
            <div style="margin-bottom: 1rem;">
                <span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; 
                            border-radius: 1rem; margin-right: 0.5rem;">Level 2</span>
                <span style="background: rgba(255,193,7,0.2); padding: 0.25rem 0.75rem; 
                            border-radius: 1rem;">Intermediate</span>
            </div>
            <h2>Object-Oriented Programming</h2>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
                Master classes, objects, inheritance, and polymorphism in Python
            </p>
            <div style="display: flex; gap: 2rem;">
                <span>⏱️ ~4 hours</span>
                <span>💻 12 Problems</span>
                <span>🚀 2 Projects</span>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    # Content tabs
    tab1, tab2, tab3, tab4 = st.tabs(["📚 Lessons", "💻 Problems", "🚀 Projects", "📖 Resources"])
    
    with tab1:
        st.markdown("### Interactive Lessons")
        
        for lesson in st.session_state.lessons:
            if lesson.stage_id == 2:  # Intermediate stage
                status_icon = "✅" if lesson.is_completed else "🔄" if lesson.id == 2 else "⭕"
                status_text = "Completed" if lesson.is_completed else "In Progress" if lesson.id == 2 else "Locked"
                
                with st.expander(f"{status_icon} {lesson.title} ({lesson.duration} min) - {status_text}"):
                    st.markdown(lesson.description)
                    
                    if lesson.is_completed or lesson.id == 2:
                        st.markdown("#### Lesson Content")
                        st.markdown(lesson.content)
                        
                        if not lesson.is_completed and lesson.id == 2:
                            if st.button(f"Mark '{lesson.title}' as Complete", key=f"complete_lesson_{lesson.id}"):
                                lesson.is_completed = True
                                st.success("Lesson completed! Great job!")
                                st.rerun()
    
    with tab2:
        st.markdown("### Practice Problems")
        st.info("💡 From: LeetCode and HackerRank")
        
        for problem in st.session_state.problems:
            if problem.stage_id == 2:
                status_icon = "✅" if problem.is_completed else "🔄" if problem.id == 2 else "❌"
                
                difficulty_colors = {
                    "Easy": "#4caf50",
                    "Medium": "#ff9800", 
                    "Hard": "#f44336"
                }
                
                col1, col2, col3 = st.columns([3, 1, 1])
                
                with col1:
                    st.markdown(f"**{status_icon} {problem.title}**")
                    st.markdown(f"*{problem.description}*")
                    st.markdown(f"Tags: {', '.join(problem.tags)}")
                
                with col2:
                    st.markdown(f"""
                    <span style="background: {difficulty_colors.get(problem.difficulty, '#9e9e9e')}; 
                                 color: white; padding: 0.25rem 0.5rem; border-radius: 0.5rem; font-size: 0.8rem;">
                        {problem.difficulty}
                    </span>
                    """, unsafe_allow_html=True)
                
                with col3:
                    if problem.source_url:
                        st.markdown(f"[{problem.source}]({problem.source_url})")
                
                if st.button(f"Solve Problem", key=f"solve_{problem.id}"):
                    st.markdown("### Code Editor")
                    
                    code_template = """# Write your solution here
class Solution:
    def twoSum(self, nums, target):
        # Your code here
        pass

# Test your solution
solution = Solution()
nums = [2, 7, 11, 15]
target = 9
result = solution.twoSum(nums, target)
print(f"Result: {result}")
"""
                    
                    code = st.text_area("Python Code", value=code_template, height=300)
                    
                    col1, col2 = st.columns(2)
                    with col1:
                        if st.button("Run Code"):
                            st.code("Output: [0, 1]")
                            st.success("Test passed!")
                    
                    with col2:
                        if st.button("Submit Solution"):
                            problem.is_completed = True
                            st.success("Solution submitted successfully!")
                            st.balloons()
                
                st.markdown("---")
    
    with tab3:
        st.markdown("### Recommended Projects")
        st.info("🎯 Apply your OOP knowledge with these hands-on projects")
        
        for project in st.session_state.projects:
            if project.stage_id == 2:
                col1, col2 = st.columns([2, 1])
                
                with col1:
                    st.markdown(f"### {project.title}")
                    st.markdown(project.description)
                    st.markdown(f"**Skills:** {', '.join(project.skills)}")
                    st.markdown(f"**Estimated Time:** ~{project.estimated_time} hours")
                    
                    difficulty_colors = {
                        "Beginner": "#2196f3",
                        "Intermediate": "#ff9800",
                        "Advanced": "#f44336"
                    }
                    
                    st.markdown(f"""
                    <span style="background: {difficulty_colors.get(project.difficulty, '#9e9e9e')}; 
                                 color: white; padding: 0.25rem 0.5rem; border-radius: 0.5rem;">
                        {project.difficulty}
                    </span>
                    """, unsafe_allow_html=True)
                
                with col2:
                    if st.button(f"Start Project", key=f"start_project_{project.id}"):
                        st.success("Project started! Check your dashboard for progress.")
                
                st.markdown("---")
    
    with tab4:
        st.markdown("### Learning Resources")
        st.info("📖 Resources will be available soon!")
        
        st.markdown("""
        #### Recommended Reading
        - [Python Official Documentation](https://docs.python.org/3/)
        - [Real Python Tutorials](https://realpython.com/)
        - [Python.org Beginner's Guide](https://www.python.org/about/gettingstarted/)
        
        #### Video Resources
        - [Python Crash Course](https://www.youtube.com/watch?v=JJmcL1N2KQs)
        - [Object-Oriented Programming](https://www.youtube.com/watch?v=Ej_02ICOIgs)
        """)

def main():
    initialize_session_state()
    
    if st.session_state.user is None:
        login_page()
    else:
        main_app()

if __name__ == "__main__":
    main()