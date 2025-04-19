# Netflix Clone with AR X-Ray

A modern Netflix clone built with Next.js, TypeScript, and Tailwind CSS, featuring an innovative AR X-Ray feature that enhances the viewing experience with contextual information.

## Features

- Pixel-perfect Netflix UI clone
- Responsive design for all devices
- Video player with custom controls
- AR X-Ray feature with:
  - Real-time scene recognition
  - Actor and character information
  - Behind-the-scenes trivia
  - Interactive AR markers
  - Dynamic content overlays
  - Gesture controls
  - Multi-language support

## Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Animation**: Framer Motion
- **AR Integration**: TensorFlow.js, AR.js
- **Video Processing**: Custom WebGL shaders
- **API Integration**: RESTful services

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/netflix-clone.git
   cd netflix-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your environment variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_AR_API_KEY=your_ar_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## AR X-Ray Features

### Scene Recognition
- Real-time scene analysis using TensorFlow.js
- Automatic detection of actors, objects, and locations
- Contextual information overlay

### Interactive Elements
- Tap on AR markers to reveal additional information
- Gesture controls for navigation
- Picture-in-picture mode for AR content

### Content Enhancement
- Behind-the-scenes trivia
- Actor biographies and filmography
- Location information and filming details
- Soundtrack and music information

### Accessibility
- Multi-language support
- Adjustable text size and contrast
- Screen reader compatibility
- Keyboard navigation

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Netflix for the original design inspiration
- TensorFlow.js team for the machine learning capabilities
- AR.js community for the augmented reality features
- Next.js team for the amazing framework 