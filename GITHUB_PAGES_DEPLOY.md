# Deploy to GitHub Pages

This guide will help you deploy your Icelandic learning website to GitHub Pages.

## Step-by-Step Guide

### 1. Create a GitHub Repository

1. Go to https://github.com/new
2. Enter a repository name (e.g., `icelandic-learning`)
3. Make it Public
4. Click "Create repository"

### 2. Upload Your Files

**Option A: Using GitHub web interface (easiest)**

1. On your new repo page, click "uploading an existing file"
2. Drag and drop all HTML files and folders from `curriculum/`
3. Click "Commit changes"

**Option B: Using git commands**

```bash
cd /Users/bjamba/.claude/skills/teach-me/curriculum
git init
git add .
git commit -m "Initial commit - Icelandic learning curriculum"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/icelandic-learning.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository's **Settings** tab
2. Click **Pages** in the left sidebar
3. Under **Build and deployment**, select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**

### 4. Wait and Test

- Wait ~2-5 minutes for GitHub Pages to deploy
- Your site will be live at: `https://YOUR_USERNAME.github.io/icelandic-learning/`

## Files Structure

```
curriculum/
├── dashboard.html          # Main entry page
├── style-guide.html        # Design reference
├── credits.html            # Credits & sources
├── README.md               # Project overview
├── curriculum.json         # Course metadata
├── assets/
│   └── theme.css           # All styling
├── module-01-greetings/    # Greetings lessons
├── module-02-food/         # Food & dining lessons
├── module-03-directions/   # Directions lessons
├── module-04-shopping/     # Shopping lessons
├── module-05-emergency/    # Emergency lessons
├── module-06-conversations # Conversation practice
└── tools/                  # Phrasebook & currency converter
```

## Troubleshooting

- **404 errors**: Check that all files are in the correct folder
- **Links not working**: Ensure relative paths are correct (they should be)
- **CSS not loading**: Make sure `assets/theme.css` is in the root

## Custom Domain (Optional)

If you want a custom domain:
1. Go to Pages settings
2. Enter your custom domain
3. Update DNS records as instructed
