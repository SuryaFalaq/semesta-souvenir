# Dokumentasi Website Semesta Souvenir

## 📋 Pendahuluan

Semesta Souvenir adalah aplikasi web modern yang dirancang untuk showcase dan mempromosikan produk souvenir premium. Website ini dibangun menggunakan teknologi React.js dengan styling Tailwind CSS untuk menciptakan user interface yang responsif dan menarik.

---

## 🎯 Tujuan Aplikasi

Website Semesta Souvenir bertujuan untuk:
1. **Menampilkan Produk** - Showcase berbagai jenis souvenir berkualitas premium
2. **Informasi Perusahaan** - Memberikan informasi lengkap tentang Semesta Souvenir, visi, dan misi
3. **Multi-Bahasa** - Mendukung interface dalam Bahasa Indonesia dan Bahasa Inggris
4. **Kemudahan Komunikasi** - Menyediakan halaman kontak untuk pelanggan yang ingin menghubungi perusahaan

---

## 🏗️ Struktur Arsitektur

### Tech Stack
```
Frontend Framework  : React.js v19.0.0
Routing            : React Router DOM v7.12.0
Styling            : Tailwind CSS v3
Icons              : Lucide React v0.562.0
Build Tool         : React Scripts
```

### Struktur Folder Project
```
semesta-souvenir/
├── public/
│   └── index.html              # Entry point HTML
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar dengan language toggle
│   │   ├── Footer.jsx          # Footer component
│   │   └── ui/
│   │       ├── button.jsx      # Reusable button component
│   │       ├── input.jsx       # Reusable input component
│   │       ├── label.jsx       # Reusable label component
│   │       ├── select.jsx      # Reusable select component
│   │       └── textarea.jsx    # Reusable textarea component
│   ├── pages/
│   │   ├── home.jsx            # Halaman utama dengan hero section
│   │   ├── About.jsx           # Informasi tentang perusahaan
│   │   ├── Products.jsx        # Katalog produk
│   │   └── Contact.jsx         # Form kontak
│   ├── context/
│   │   └── LanguageContext.js  # Context untuk manajemen bahasa
│   ├── data/
│   │   └── mock.js             # Mock data dan translations
│   ├── App.js                  # Main app component
│   ├── App.css                 # Global styles
│   ├── index.js                # React entry point
│   └── index.css               # Global CSS dengan Tailwind directives
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

---

## 🎨 Fitur Utama

### 1. **Multi-Language Support (i18n)**
- Implementasi Context API untuk manajemen bahasa
- Dukungan Bahasa Indonesia (id) dan Bahasa Inggris (en)
- Penyimpanan preference bahasa di localStorage
- Toggle button di navbar untuk switching bahasa

**Cara Kerja:**
```javascript
// LanguageContext.js menggunakan Context API
- createContext untuk membuat language context
- useState untuk menyimpan language state
- localStorage untuk persist preference user
- Custom hook useLanguage() untuk akses di komponen manapun
```

### 2. **Routing dengan React Router**
- Single Page Application (SPA) dengan client-side routing
- 4 halaman utama: Home, About, Products, Contact
- Navigation dengan smooth transitions

**Routes:**
```
/              → Home (Hero section + Features)
/about         → Tentang Kami (Company info, vision, mission)
/products      → Katalog Produk (Product listing)
/contact       → Hubungi Kami (Contact form)
```

### 3. **Responsive Design**
- Mobile-first approach dengan Tailwind CSS
- Breakpoints: sm, md, lg untuk berbagai ukuran layar
- Navbar yang collapsible untuk mobile
- Grid layout yang adaptif

### 4. **Reusable UI Components**
Komponen UI yang dapat digunakan kembali di berbagai halaman:
- Button (dengan variant: primary, outline, ghost)
- Input field
- Select dropdown
- Textarea
- Label

---

## 📄 Halaman-Halaman

### **Home Page** (`home.jsx`)
- **Hero Section**: Greeting utama dengan CTA buttons
- **Features Section**: 4 keunggulan Semesta Souvenir
  - Kualitas Premium
  - Desain Custom
  - Harga Kompetitif
  - Pengiriman Tepat Waktu
- **Products Preview**: Showcase produk terpopuler

### **About Page** (`About.jsx`)
- Informasi perusahaan lengkap
- Visi perusahaan
- Misi perusahaan
- Nilai-nilai yang dipegang

### **Products Page** (`Products.jsx`)
- Katalog lengkap produk souvenir
- Filter berdasarkan kategori
- Tampilan grid produk dengan gambar dan deskripsi
- Detail produk dan pricing

### **Contact Page** (`Contact.jsx`)
- Form kontak dengan validasi
- Fields: Name, Email, Subject, Message
- Integration dengan email service (atau backend API)
- Informasi kontak perusahaan

---

## 🔧 State Management

### Context API untuk Language Management
```javascript
// Struktur LanguageContext
{
  language: 'id' | 'en',           // Current language
  setLanguage: (lang) => void,      // Setter untuk language
  toggleLanguage: () => void,       // Toggle antara id dan en
  t: (key: string) => string        // Translation function
}

// LocalStorage
- Key: 'language'
- Value: 'id' atau 'en'
```

### Mock Data Structure
```javascript
// translations.id / translations.en
{
  nav: { home, about, products, contact },
  hero: { title, subtitle, description, cta, ctaSecondary },
  features: { title, items: [...] },
  about: { title, subtitle, description, vision, mission },
  products: { title, items: [...] },
  contact: { title, form: {...} }
}
```

---

## 🎨 Design System

### Color Palette
```css
Primary    : #1e1919 (Dark Brown)
Secondary  : #61525a (Muted Purple)
Accent     : #736c64 (Taupe)
Light      : #f7f5f2 (Off White)
```

### Typography
- Font Family: System UI fonts (-apple-system, BlinkMacSystemFont, Segoe UI, dll)
- Responsive font sizing dengan Tailwind
- Font weights: normal (400), medium (500), bold (700)

### Spacing & Layout
- Menggunakan Tailwind's spacing scale
- Max-width container: 1200px
- Padding responsive: px-4 (mobile) hingga px-8 (desktop)

---

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites
- Node.js v16 atau lebih tinggi
- npm atau yarn

### Installation & Setup
```bash
# 1. Navigate ke project directory
cd semesta-souvenir

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm start

# Server akan berjalan di http://localhost:3000
```

### Build untuk Production
```bash
npm run build
# Output akan ada di folder 'build/'
```

---

## 📦 Dependencies

| Package | Version | Fungsi |
|---------|---------|--------|
| react | ^19.0.0 | Framework utama |
| react-dom | ^19.0.0 | React DOM rendering |
| react-router-dom | ^7.12.0 | Client-side routing |
| react-scripts | 5.0.1 | Build tool & dev server |
| tailwindcss | ^3.0.0 | CSS framework |
| lucide-react | ^0.562.0 | Icon library |
| postcss | Latest | CSS processing |
| autoprefixer | Latest | Browser prefixes |

---

## 🔐 Best Practices yang Diterapkan

### 1. **Component Composition**
- Komponen dipisah berdasarkan fungsi (pages, components, ui)
- Reusable components untuk UI elements
- Compound components pattern untuk kompleks components

### 2. **State Management**
- Context API untuk global state (language)
- Local state dengan useState untuk komponen-specific state
- localStorage untuk persist user preferences

### 3. **Routing Structure**
- Clean URL structure yang semantic
- Proper component organization
- Dynamic routing support

### 4. **Styling Approach**
- Utility-first CSS dengan Tailwind
- Consistent color palette
- Responsive design dengan breakpoints
- Custom animations dan transitions

### 5. **Performance**
- Code splitting dengan React Router
- Lazy loading untuk komponen
- Optimized bundle size

---

## 🔄 Potential Improvements & Future Enhancements

### Fase 2 - Backend Integration
```
- RESTful API untuk product data
- Database untuk products, users, orders
- Authentication & authorization
- Payment gateway integration
```

### Fase 3 - Advanced Features
```
- Shopping cart functionality
- Order tracking system
- User account management
- Product search & filtering
- Reviews & ratings
- Email notifications
```

### Fase 4 - Performance & Analytics
```
- Google Analytics integration
- SEO optimization
- Image optimization & lazy loading
- Caching strategy
- PWA capabilities
```

---

## 📊 File Statistics

| Jenis File | Jumlah | Total Lines (approx) |
|-----------|--------|----------------------|
| Components | 8 | ~500 |
| Pages | 4 | ~800 |
| Hooks/Context | 1 | ~50 |
| Data/Mocks | 1 | ~235 |
| Styles | 3 | ~150 |
| Config | 4 | ~50 |
| **Total** | **21** | **~1,785** |

---

## 🎓 Learning Outcomes

Melalui project ini, telah dipraktikkan:

### React Concepts
✅ Functional Components  
✅ Hooks (useState, useEffect, useContext)  
✅ Props & Component Composition  
✅ Context API  
✅ Conditional Rendering  
✅ List Rendering dengan .map()  

### Routing
✅ React Router v7  
✅ Dynamic Routes  
✅ Nested Routes  
✅ Navigation with Link & useNavigate  

### Styling
✅ Tailwind CSS  
✅ Responsive Design  
✅ CSS-in-JS patterns  
✅ Responsive Images  

### State Management
✅ Local State dengan useState  
✅ Global State dengan Context API  
✅ localStorage API  
✅ Custom Hooks  

### Best Practices
✅ Component Organization  
✅ Code Reusability  
✅ Separation of Concerns  
✅ Consistent File Structure  
✅ DRY (Don't Repeat Yourself) Principle  

---

## 📞 Support & Troubleshooting

### Common Issues & Solutions

**Problem: Styling tidak muncul**
- Solution: Pastikan Tailwind CSS sudah running dengan `npm start`
- Check: Apakah tailwind.config.js dan postcss.config.js sudah ada

**Problem: Language tidak tersimpan**
- Solution: Cek browser localStorage di DevTools
- Check: Apakah LanguageContext sudah wrap di App component

**Problem: Routes tidak working**
- Solution: Pastikan BrowserRouter membungkus routes
- Check: Path di Route component harus match dengan Link destination

---

## 🏆 Kesimpulan

Website Semesta Souvenir adalah implementasi modern dari e-commerce showcase yang mendemonstrasikan:
- Penggunaan React.js secara proper dan professional
- State management dengan Context API
- Responsive design dengan Tailwind CSS
- Clean code structure dan component organization
- User experience yang baik dengan multi-language support

Project ini siap untuk di-extend dengan backend API dan fitur-fitur tambahan seperti payment gateway, user authentication, dan order management.

---

**Dibuat dengan ❤️ menggunakan React.js & Tailwind CSS**
