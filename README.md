# Foiné - Pinterest-Style Visual Discovery Platform

A modern, full-stack web application built with Spring Boot and React, featuring a beautiful glassmorphism design system. Foiné allows users to discover, share, and organize visual content in an intuitive Pinterest-inspired interface.

![Foiné Preview](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=Foiné+Preview)

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📸 **Image Upload** - Cloudinary integration for media storage
- 🎨 **Glassmorphism UI** - Modern, translucent design system
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🏷️ **Tag System** - Organize content with custom tags
- ❤️ **Like System** - Interactive engagement features
- 🔍 **Masonry Layout** - Pinterest-style content discovery
- 🛡️ **Spring Security** - Enterprise-grade security
- 🗄️ **JPA/Hibernate** - Robust data persistence

## 🏗️ Architecture

### Backend (Spring Boot 3.3.0)
- **Framework**: Spring Boot 3.3.0 with Java 17
- **Security**: Spring Security 6 with JWT authentication
- **Database**: JPA/Hibernate with H2 (demo) / PostgreSQL (production)
- **Storage**: Cloudinary for image management
- **API**: RESTful endpoints with proper error handling

### Frontend (React 18)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom glassmorphism components
- **State**: React hooks for local state management
- **HTTP**: Axios for API communication
- **Routing**: Client-side routing (ready for React Router)

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (JDK)
- **Maven 3.6+** or **Maven Daemon (mvnd)**
- **Node.js 18+** and **npm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/l9rins/foine-2025.git
   cd foine-2025
   ```

2. **Backend Setup**
   ```bash
   # Install dependencies and compile
   mvn clean compile

   # Configure database (optional - H2 is configured by default)
   # Edit src/main/resources/application.properties
   ```

3. **Frontend Setup**
   ```bash
   # Install dependencies
   npm install
   ```

### Running the Application

1. **Start Backend** (Terminal 1)
   ```bash
   mvn spring-boot:run
   # or with Maven Daemon:
   mvnd spring-boot:run
   ```
   Backend will be available at: http://localhost:8080

2. **Start Frontend** (Terminal 2)
   ```bash
   npm run dev
   ```
   Frontend will be available at: http://localhost:2049

3. **Access H2 Database Console** (Optional)
   - URL: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:foine_db`
   - Username: `sa`
   - Password: (leave blank)

## 📁 Project Structure

```
foine-2025/
├── src/main/java/com/foine/           # Backend source code
│   ├── controller/                    # REST controllers
│   ├── model/                         # JPA entities
│   ├── repository/                    # Data repositories
│   ├── service/                       # Business logic
│   ├── security/                      # Security configuration
│   └── config/                        # Application configuration
├── src/main/resources/                 # Application resources
│   └── application.properties         # Configuration
├── src/                               # Frontend source code
│   ├── components/                    # React components
│   ├── pages/                         # Page components
│   ├── api/                           # API utilities
│   └── assets/                        # Static assets
├── public/                            # Public assets
├── target/                            # Build artifacts (ignored)
├── node_modules/                      # Dependencies (ignored)
├── pom.xml                            # Maven configuration
├── package.json                       # NPM configuration
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind configuration
└── README.md                          # This file
```

## 🔧 Configuration

### Database Configuration

**For Development (H2 - Default):**
```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:h2:mem:foine_db
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
```

**For Production (PostgreSQL/Supabase):**
```properties
spring.datasource.url=jdbc:postgresql://YOUR_HOST:5432/YOUR_DB
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

### Cloudinary Configuration
```properties
cloudinary.cloud_name=YOUR_CLOUD_NAME
cloudinary.api_key=YOUR_API_KEY
cloudinary.api_secret=YOUR_API_SECRET
```

### JWT Configuration
```properties
jwt.secret=YOUR_JWT_SECRET_KEY
jwt.expiration-ms=86400000
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get all posts (public)
- `GET /api/posts/{id}` - Get post by ID
- `POST /api/posts` - Create new post (authenticated)
- `DELETE /api/posts/{id}` - Delete post (owner only)

## 🎨 Design System

### Glassmorphism Components
- `.glass-panel` - Translucent content containers
- `.glass-input` - Styled form inputs
- Custom backdrop blur and opacity utilities

### Color Palette
- Primary: Slate gradients (`slate-900` to `slate-800`)
- Accent: Blue (`blue-600`, `blue-700`)
- Success: Green (`green-600`, `green-700`)
- Error: Red (`red-600`, `red-700`)

## 🧪 Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
npm test
```

## 🚀 Deployment

### Backend Deployment
```bash
mvn clean package
java -jar target/foine-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Build
```bash
npm run build
# Deploy the dist/ folder to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot** - For the robust backend framework
- **React** - For the flexible frontend library
- **Tailwind CSS** - For the utility-first styling approach
- **Pinterest** - For the inspiration behind the visual discovery concept

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Built with ❤️ using Spring Boot, React, and modern web technologies.**