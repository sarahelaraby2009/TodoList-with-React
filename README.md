# React Task Manager

A modern task management application built with React, featuring a clean and intuitive UI for managing your daily tasks.

## Features

- ✅ **Create Tasks** - Add new tasks with titles and detailed descriptions
- ✏️ **Edit Tasks** - Modify task titles and details with an intuitive modal interface
- ✓ **Mark Complete** - Check off completed tasks with a single click
- 🗑️ **Delete Tasks** - Remove tasks from your list with confirmation dialog
- 🔍 **Filter Tasks** - View all tasks, only pending, or only completed tasks
- 📱 **Responsive Design** - Beautiful UI built with Material-UI (MUI)
- 🎨 **Modern Styling** - Uses Emotion for CSS-in-JS styling with glassmorphism effects

## Tech Stack

- **React** (v19.2.0) - UI framework
- **Vite** (v7.2.4) - Lightning-fast build tool and dev server
- **Material-UI** (v7.3.7) - Comprehensive component library
- **React Router DOM** (v7.12.0) - Client-side routing
- **Emotion** (v11.14.0) - CSS-in-JS styling library
- **Font Awesome** (v7.1.0) - Icon library
- **ESLint** - Code quality and linting

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                # App styling
├── main.jsx                # Entry point
├── index.css              # Global styles
├── components/
│   ├── TaskWindow.jsx     # Main task display and input component
│   ├── Taskbar.jsx        # Individual task item with actions
│   └── SnackBar.jsx       # Notification component
├── contexts/
│   └── TaskList.jsx       # React Context for global task state
└── assets/                # Project assets
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd react-practice
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## Component Overview

### TaskWindow
The main component that displays the task list and provides input for creating new tasks. Features:
- Text input for new task creation
- Filter buttons (All, Pending, Completed)
- Dynamic task list rendering
- Task notifications via Snackbar

### Taskbar
Individual task item component with action buttons:
- Edit button - Opens modal to update task details
- Check button - Marks task as completed
- Delete button - Removes task with confirmation dialog

### SnackBar
Custom notification component for user feedback on actions like task creation and deletion.

## State Management

The application uses **React Context API** to manage global task state:

```javascript
{
  tasks: [
    {
      id: number,
      task: string,
      details: string,
      completed: boolean
    }
  ],
  setTasks: function
}
```

## Usage

1. **Add a Task** - Type in the text field and click the add button
2. **Edit a Task** - Click the edit icon on any task to modify its details
3. **Complete a Task** - Click the checkmark icon to toggle completion status
4. **Delete a Task** - Click the delete icon and confirm in the dialog
5. **Filter Tasks** - Use the filter buttons to view specific task categories

## Customization

### Themes

The app uses Material-UI's theme system. Modify the theme in `App.jsx`:

```javascript
const theme = createTheme({
  typography: {
    fontFamily: ['Bitcount Single']
  }
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and educational use.

## Author

Created as a React learning practice project.
