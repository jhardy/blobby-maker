# Blobby Maker 🎨

Create and customize your own unique blobby characters with this interactive character creator!

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/jhardy/blobby-maker)

## Features

- 👀 **Customizable Eyes** - Choose from 20+ eye styles
- 👄 **Expressive Mouths** - Pick from various mouth expressions
- 🎩 **Stylish Hats** - Add and color-customize different hats
- 🎨 **Custom Uploads** - Upload your own images for eyes, mouths, hats, or decorations
- 🎯 **Precise Positioning** - Position, scale, and rotate custom items anywhere
- 💾 **Download as PNG** - Export your creation as a high-quality image
- 🌈 **Color Options** - Multiple gradient body colors and customizable hat colors

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
