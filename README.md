# Ayush Kashyap - AI Engineer Portfolio

A modern, beautiful portfolio website built with Next.js, showcasing AI/ML projects, experience, and skills.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and Tailwind CSS
- **Stunning Animations**: Smooth transitions and animations using Framer Motion
- **Cyberpunk Theme**: Beautiful tech-inspired design with gradient effects and particle background
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Contact Form**: Integrated contact form (requires email service setup)
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Fast loading with Next.js optimizations

## 📋 Sections

1. **Hero** - Eye-catching introduction with animated elements
2. **About** - Personal bio, education, and achievements
3. **Experience** - Professional internships and work history
4. **Projects** - Featured AI/ML projects with descriptions
5. **Skills** - Technical skills with animated progress bars
6. **Contact** - Contact form and social links
7. **Footer** - Copyright and attribution

## 🛠️ Installation

1. Navigate to the project directory:
```bash
cd portfolio-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📧 Email Service Setup (Optional)

To enable the contact form email functionality, you need to set up an email service:

### Option 1: Using Nodemailer with Gmail

1. Install nodemailer:
```bash
npm install nodemailer
```

2. Create a `.env.local` file:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
```

3. Update the API route in `src/app/api/contact/route.js` with nodemailer configuration

### Option 2: Using SendGrid

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Get API key from SendGrid and add to `.env.local`:
```env
SENDGRID_API_KEY=your-api-key
```

### Option 3: Using Resend (Recommended)

1. Install Resend:
```bash
npm install resend
```

2. Get API key from Resend.com and add to `.env.local`:
```env
RESEND_API_KEY=your-api-key
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  'tech-dark': '#0a0e27',
  'tech-blue': '#00d4ff',
  'tech-purple': '#8b5cf6',
  // Add your own colors
}
```

### Content
- Update personal information in component files
- Modify projects in `src/components/Projects.js`
- Add/remove skills in `src/components/Skills.js`
- Update experience in `src/components/Experience.js`

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project to Vercel
3. Deploy with one click

### Other Platforms
- **Netlify**: Connect GitHub repo and deploy
- **AWS**: Use AWS Amplify or EC2
- **DigitalOcean**: Use App Platform

## 📄 License

MIT License - feel free to use this portfolio for your own projects!

## 👤 Author

**Ayush Kashyap**
- GitHub: [@Ayush0135](https://github.com/Ayush0135)
- LinkedIn: [Ayush Kashyap](https://www.linkedin.com/in/ayush-kashyap-11645626a/)
- Email: ayush.kashyap7155@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
