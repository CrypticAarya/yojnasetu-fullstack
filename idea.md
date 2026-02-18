# 🏛️ YojnaSetu – Project Idea

## 📋 Project Scope

YojnaSetu is a full-stack web application that centralizes government scheme information and automatically determines user eligibility using a rule-based backend engine. Instead of users manually reading eligibility criteria across multiple portals, the system evaluates their profile data against scheme rules and provides an eligibility result instantly.

## 🎯 Core Objective

- **Reduce information fragmentation** - Centralize all government schemes in one platform
- **Automate eligibility checking** - Eliminate manual reading and interpretation of eligibility criteria
- **Provide scalable rule-based scheme management** - Easy addition and modification of schemes and rules
- **Demonstrate strong backend engineering practices** - Clean architecture, OOP principles, and design patterns

## 🔑 Key Features

### 1. Rule-Based Eligibility Engine
- Modular rule evaluation system
- Dynamic rule loading
- Strategy pattern implementation
- Extensible rule design (AgeRule, IncomeRule, CategoryRule, LocationRule, etc.)
- Support for complex eligibility criteria combinations

### 2. Profile-Based Filtering
- Personalized scheme recommendations based on user profile
- Automatic eligibility status calculation
- Real-time eligibility updates when profile changes

### 3. Role-Based Access Control
- **Citizen Role**: Access to personal dashboard, scheme browsing, eligibility checking
- **Admin Role**: Scheme management, rule configuration, user management
- Secure authentication using JWT tokens
- Protected routes and endpoints

### 4. Clean Backend Architecture
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer
- **Repositories**: Data access layer
- **Models**: Data models and entities
- **Rule Engine**: Separate module for eligibility evaluation

### 5. Scalable Data Model
- Separate scheme rules table for flexible rule management
- Proper relationship mapping between entities
- Foreign key constraints for data integrity
- Support for multiple rule types per scheme

### 6. User Profile Management
- Comprehensive profile creation and updates
- Fields: age, income, category (SC/ST/OBC/General), location, occupation
- Profile validation and data integrity

### 7. Scheme Management
- Add/edit/delete schemes
- Define eligibility criteria
- Activate/deactivate schemes
- Manage required documents
- Track application status

### 8. Application Tracking
- Submit applications for eligible schemes
- Track application status (Pending, Approved, Rejected, Under Review)
- View application history

## 🏗️ Technical Architecture

### Backend Design Principles
- **Layered Architecture**: Controller → Service → Repository
- **OOP Principles**:
  - Encapsulation (business logic in services)
  - Abstraction (EligibilityRule abstract class)
  - Inheritance (AgeRule, IncomeRule extend EligibilityRule)
  - Polymorphism (evaluate() method override)

### Design Patterns
- **Strategy Pattern**: Rule evaluation (different rules implement same interface)
- **Factory Pattern**: Rule creation based on rule type
- **Singleton**: Database connection management
- **Repository Pattern**: Data access abstraction

## 🎯 Target Users

1. **Citizens**: General public seeking government scheme information and eligibility
2. **Administrators**: Government officials managing schemes and rules

## 📊 Success Metrics

- Reduced time to check eligibility (from hours to seconds)
- Increased scheme discovery rate
- Improved user engagement with government schemes
- Scalable rule management system
