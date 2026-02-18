# Class Diagram - YojnaSetu

```mermaid
classDiagram
    %% Controllers Layer
    class AuthController {
        -authService: AuthService
        +register(req, res): Response
        +login(req, res): Response
        +logout(req, res): Response
    }
    
    class ProfileController {
        -profileService: ProfileService
        +createProfile(req, res): Response
        +updateProfile(req, res): Response
        +getProfile(req, res): Response
    }
    
    class SchemeController {
        -schemeService: SchemeService
        +getAllSchemes(req, res): Response
        +getSchemeById(req, res): Response
        +checkEligibility(req, res): Response
        +getPersonalizedSchemes(req, res): Response
    }
    
    class AdminController {
        -schemeService: SchemeService
        -ruleService: RuleService
        +createScheme(req, res): Response
        +updateScheme(req, res): Response
        +deleteScheme(req, res): Response
        +activateScheme(req, res): Response
        +deactivateScheme(req, res): Response
    }
    
    class ApplicationController {
        -applicationService: ApplicationService
        +submitApplication(req, res): Response
        +getApplicationStatus(req, res): Response
        +getApplicationHistory(req, res): Response
    }
    
    %% Services Layer
    class AuthService {
        -userRepository: UserRepository
        -jwtService: JWTService
        +register(userData): User
        +login(email, password): Token
        +validateToken(token): User
    }
    
    class ProfileService {
        -profileRepository: ProfileRepository
        +createProfile(userId, profileData): Profile
        +updateProfile(userId, profileData): Profile
        +getProfile(userId): Profile
    }
    
    class SchemeService {
        -schemeRepository: SchemeRepository
        -eligibilityService: EligibilityService
        +getAllSchemes(): Scheme[]
        +getSchemeById(id): Scheme
        +checkEligibility(userId, schemeId): EligibilityResult
        +getPersonalizedSchemes(userId): Scheme[]
        +createScheme(schemeData): Scheme
        +updateScheme(id, schemeData): Scheme
        +deleteScheme(id): void
    }
    
    class EligibilityService {
        -ruleEngine: RuleEngine
        -ruleRepository: RuleRepository
        +evaluateEligibility(profile, rules): EligibilityResult
        +checkEligibility(profile, schemeId): EligibilityResult
    }
    
    class RuleService {
        -ruleRepository: RuleRepository
        +createRule(schemeId, ruleData): Rule
        +updateRule(ruleId, ruleData): Rule
        +deleteRule(ruleId): void
        +getRulesBySchemeId(schemeId): Rule[]
    }
    
    class ApplicationService {
        -applicationRepository: ApplicationRepository
        -schemeService: SchemeService
        +submitApplication(userId, schemeId, documents): Application
        +getApplicationStatus(applicationId): Application
        +getApplicationHistory(userId): Application[]
        +updateApplicationStatus(applicationId, status): Application
    }
    
    %% Rule Engine Layer
    class RuleEngine {
        -ruleFactory: RuleFactory
        +evaluate(profile, rules): boolean
        +evaluateRule(profile, rule): boolean
    }
    
    class RuleFactory {
        +createRule(ruleType, ruleData): EligibilityRule
    }
    
    class EligibilityRule {
        <<abstract>>
        +ruleType: string
        +evaluate(profile, ruleData): boolean*
    }
    
    class AgeRule {
        +ruleType: "AGE"
        +evaluate(profile, ruleData): boolean
        -checkAgeRange(age, minAge, maxAge): boolean
    }
    
    class IncomeRule {
        +ruleType: "INCOME"
        +evaluate(profile, ruleData): boolean
        -checkIncomeLimit(income, maxIncome): boolean
    }
    
    class CategoryRule {
        +ruleType: "CATEGORY"
        +evaluate(profile, ruleData): boolean
        -checkCategory(category, allowedCategories): boolean
    }
    
    class LocationRule {
        +ruleType: "LOCATION"
        +evaluate(profile, ruleData): boolean
        -checkLocation(location, allowedLocations): boolean
    }
    
    class OccupationRule {
        +ruleType: "OCCUPATION"
        +evaluate(profile, ruleData): boolean
        -checkOccupation(occupation, allowedOccupations): boolean
    }
    
    %% Repository Layer
    class UserRepository {
        +findById(id): User
        +findByEmail(email): User
        +create(userData): User
        +update(id, userData): User
    }
    
    class ProfileRepository {
        +findByUserId(userId): Profile
        +create(userId, profileData): Profile
        +update(userId, profileData): Profile
    }
    
    class SchemeRepository {
        +findAll(): Scheme[]
        +findById(id): Scheme
        +findActiveSchemes(): Scheme[]
        +create(schemeData): Scheme
        +update(id, schemeData): Scheme
        +delete(id): void
    }
    
    class RuleRepository {
        +findBySchemeId(schemeId): Rule[]
        +findById(id): Rule
        +create(schemeId, ruleData): Rule
        +update(id, ruleData): Rule
        +delete(id): void
    }
    
    class ApplicationRepository {
        +findById(id): Application
        +findByUserId(userId): Application[]
        +findBySchemeId(schemeId): Application[]
        +create(applicationData): Application
        +update(id, applicationData): Application
    }
    
    %% Models/Entities
    class User {
        +id: string
        +email: string
        +password: string (hashed)
        +role: string
        +createdAt: Date
        +updatedAt: Date
    }
    
    class Profile {
        +id: string
        +userId: string
        +age: number
        +income: number
        +category: string
        +location: string
        +occupation: string
        +createdAt: Date
        +updatedAt: Date
    }
    
    class Scheme {
        +id: string
        +name: string
        +description: string
        +requiredDocuments: string[]
        +isActive: boolean
        +createdAt: Date
        +updatedAt: Date
    }
    
    class Rule {
        +id: string
        +schemeId: string
        +ruleType: string
        +ruleData: object
        +createdAt: Date
        +updatedAt: Date
    }
    
    class Application {
        +id: string
        +userId: string
        +schemeId: string
        +status: string
        +documents: string[]
        +submittedAt: Date
        +updatedAt: Date
    }
    
    class EligibilityResult {
        +eligible: boolean
        +reasons: string[]
        +failedRules: string[]
    }
    
    %% Relationships - Controllers to Services
    AuthController --> AuthService
    ProfileController --> ProfileService
    SchemeController --> SchemeService
    AdminController --> SchemeService
    AdminController --> RuleService
    ApplicationController --> ApplicationService
    
    %% Relationships - Services to Repositories
    AuthService --> UserRepository
    ProfileService --> ProfileRepository
    SchemeService --> SchemeRepository
    SchemeService --> EligibilityService
    EligibilityService --> RuleEngine
    EligibilityService --> RuleRepository
    RuleService --> RuleRepository
    ApplicationService --> ApplicationRepository
    ApplicationService --> SchemeService
    
    %% Relationships - Rule Engine
    RuleEngine --> RuleFactory
    RuleFactory --> EligibilityRule
    EligibilityRule <|-- AgeRule
    EligibilityRule <|-- IncomeRule
    EligibilityRule <|-- CategoryRule
    EligibilityRule <|-- LocationRule
    EligibilityRule <|-- OccupationRule
    
    %% Relationships - Repositories to Models
    UserRepository --> User
    ProfileRepository --> Profile
    SchemeRepository --> Scheme
    RuleRepository --> Rule
    ApplicationRepository --> Application
    
    %% Relationships - Models
    User "1" --> "1" Profile : has
    User "1" --> "*" Application : submits
    Scheme "1" --> "*" Rule : has
    Scheme "1" --> "*" Application : receives
    Profile --> EligibilityResult : evaluates to
```

## Class Descriptions

### Controllers
- **AuthController**: Handles user authentication (register, login, logout)
- **ProfileController**: Manages user profile operations
- **SchemeController**: Handles scheme browsing and eligibility checking for citizens
- **AdminController**: Manages scheme and rule CRUD operations for admins
- **ApplicationController**: Handles application submission and tracking

### Services
- **AuthService**: Business logic for authentication and authorization
- **ProfileService**: Profile management logic
- **SchemeService**: Scheme-related business logic and eligibility orchestration
- **EligibilityService**: Coordinates eligibility evaluation
- **RuleService**: Rule management operations
- **ApplicationService**: Application lifecycle management

### Rule Engine
- **RuleEngine**: Main orchestrator for rule evaluation
- **RuleFactory**: Creates appropriate rule instances based on type
- **EligibilityRule**: Abstract base class for all rule types
- **Concrete Rules**: AgeRule, IncomeRule, CategoryRule, LocationRule, OccupationRule

### Repositories
- Data access layer for each entity (User, Profile, Scheme, Rule, Application)

### Models
- **User**: User account information
- **Profile**: Citizen profile data
- **Scheme**: Government scheme information
- **Rule**: Eligibility rule definition
- **Application**: Scheme application record
- **EligibilityResult**: Result of eligibility evaluation
