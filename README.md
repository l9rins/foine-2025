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

### Database Setup (Supabase)

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a free account
   - Create a new project
   - Wait for the database to be provisioned

2. **Get Database Credentials**:
   - Go to Project Settings → Database → Connection String
   - Copy the JDBC connection string
   - Note your database password

3. **Configure Application**:
   ```bash
   # Copy the example configuration
   cp src/main/resources/application-example.properties src/main/resources/application.properties

   # Edit application.properties with your Supabase credentials
   # Replace YOUR_PROJECT_REF.supabase.co, YOUR_DATABASE_PASSWORD
   ```

### Cloudinary Setup (Image Storage)

1. **Create Cloudinary Account**:
   - Go to [cloudinary.com](https://cloudinary.com) and sign up for free
   - Verify your account

2. **Get API Credentials**:
   - Go to Dashboard → Account Details
   - Copy Cloud Name, API Key, and API Secret

3. **Configure Application**:
   - Update `application.properties` with your Cloudinary credentials
   - The app will automatically upload images to Cloudinary

### Environment Variables (Alternative)

You can also use environment variables instead of hardcoding credentials:

```bash
export SPRING_DATASOURCE_URL="jdbc:postgresql://your-project.supabase.co:5432/postgres"
export SPRING_DATASOURCE_USERNAME="postgres"
export SPRING_DATASOURCE_PASSWORD="your-password"
export CLOUDINARY_CLOUD_NAME="your-cloud-name"
export CLOUDINARY_API_KEY="your-api-key"
export CLOUDINARY_API_SECRET="your-api-secret"
export JWT_SECRET="your-jwt-secret"
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