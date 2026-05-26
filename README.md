# 🎁 Semesta Souvenir - Website Showcase

Website modern untuk Semesta Souvenir - penyedia souvenir premium berkualitas tinggi dengan dukungan multi-bahasa dan responsive design.

## ✨ Fitur Utama

- 🌐 **Multi-Language**: Dukungan Bahasa Indonesia & English
- 📱 **Responsive Design**: Optimal display di desktop, tablet, & mobile
- ⚡ **Fast Performance**: SPA dengan React.js modern
- 🎨 **Modern UI**: Styling dengan Tailwind CSS
- 🧭 **Easy Navigation**: Client-side routing dengan React Router
- 💾 **Persistent State**: Language preference tersimpan di localStorage

## 🛠️ Tech Stack

- **Framework**: React.js v19
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Build Tool**: React Scripts

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── context/            # React Context (Language Management)
├── data/               # Mock data & translations
├── App.js              # Main app component
└── index.js            # React entry point
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

Server akan berjalan di `http://localhost:3000`

## 📄 Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero section & product showcase |
| About | `/about` | Company info, vision, mission |
| Products | `/products` | Product catalog |
| Contact | `/contact` | Contact form |

## 🎯 Key Components

### Navbar
- Responsive navigation dengan mobile menu
- Language toggle (ID/EN)
- Active link indicators

### Footer
- Links to social media
- Contact information
- Copyright notice

### Reusable UI Elements
- Button (multiple variants)
- Input fields
- Select dropdowns
- Textarea
- Form labels

## 🌍 Language Support

Aplikasi mendukung switching bahasa real-time:
- **Indonesian (ID)** - Default
- **English (EN)** - Available

Preference tersimpan di localStorage dan persist across sessions.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Design System

### Colors
- Primary: #1e1919 (Dark Brown)
- Secondary: #61525a (Muted Purple)
- Accent: #736c64 (Taupe)
- Light: #f7f5f2 (Off White)

### Typography
- Font Family: System UI fonts
- Responsive sizing dengan Tailwind
- Font weights: 400, 500, 700

## 📚 Learn More

Lihat [DOKUMENTASI.md](./DOKUMENTASI.md) untuk dokumentasi lengkap tentang:
- Arsitektur aplikasi
- State management
- Component structure
- Best practices yang diterapkan
- Future improvements

## 🔒 Environment

Project ini tidak memerlukan environment variables untuk development mode.

Untuk production, tambahkan:
```
REACT_APP_API_URL=<backend-api-url>
```

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a React.js learning project.

---

**Happy Coding! 🚀**
