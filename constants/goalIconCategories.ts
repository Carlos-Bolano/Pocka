export interface GoalIcon {
  name: string; // Descriptive name of the icon (e.g., "Phone")
  iconName: string; // Name of the icon from the library (e.g., "phone")
  iconFamily: string; // Icon family (e.g., "FontAwesome")
}

export interface GoalIconCategory {
  title: string; // Category title (e.g., "Technology")
  icons: GoalIcon[]; // Array of GoalIcon objects
}

export const goalIconCategories: GoalIconCategory[] = [
  {
    title: "Technology",
    icons: [
      { name: "Phone", iconName: "phone-iphone", iconFamily: "MaterialIcons" },
      { name: "Tablet", iconName: "tablet", iconFamily: "MaterialIcons" },
      { name: "Laptop", iconName: "laptop", iconFamily: "MaterialIcons" },
      { name: "Desktop", iconName: "monitor-dashboard", iconFamily: "MaterialCommunityIcons" },
      { name: "Smartwatch", iconName: "watch", iconFamily: "MaterialCommunityIcons" },
      { name: "Camera", iconName: "camera", iconFamily: "FontAwesome" },
      { name: "Headphones", iconName: "headphones", iconFamily: "FontAwesome5" },
      { name: "Console", iconName: "gamepad-variant", iconFamily: "MaterialCommunityIcons" },
      { name: "Charger", iconName: "power-plug", iconFamily: "MaterialCommunityIcons" },
      { name: "Television", iconName: "television", iconFamily: "MaterialCommunityIcons" },
      { name: "Drone", iconName: "drone", iconFamily: "MaterialCommunityIcons" },
      { name: "Server", iconName: "server", iconFamily: "MaterialCommunityIcons" },
      { name: "Printer", iconName: "printer", iconFamily: "MaterialCommunityIcons" },
      { name: "Speaker", iconName: "speaker-wireless", iconFamily: "MaterialCommunityIcons" },
      { name: "Apple", iconName: "apple", iconFamily: "FontAwesome" },
      { name: "Android", iconName: "android", iconFamily: "FontAwesome" },
      { name: "Windows", iconName: "windows", iconFamily: "FontAwesome" },
      { name: "Playstation", iconName: "playstation", iconFamily: "FontAwesome5" },
      { name: "Xbox", iconName: "xbox", iconFamily: "FontAwesome5" },
      { name: "Nintendo", iconName: "nintendo-switch", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Transportation",
    icons: [
      { name: "Car", iconName: "car", iconFamily: "FontAwesome" },
      { name: "Motorcycle", iconName: "motorcycle", iconFamily: "FontAwesome" },
      { name: "Bicycle", iconName: "bicycle", iconFamily: "FontAwesome" },
      { name: "Bus", iconName: "bus", iconFamily: "FontAwesome" },
      { name: "Train", iconName: "train", iconFamily: "FontAwesome" },
      { name: "Subway", iconName: "subway", iconFamily: "MaterialCommunityIcons" },
      { name: "Airplane", iconName: "airplane", iconFamily: "MaterialCommunityIcons" },
      { name: "Boat", iconName: "boat", iconFamily: "Ionicons" },
      { name: "Truck", iconName: "truck", iconFamily: "FontAwesome" },
      { name: "Skateboard", iconName: "skateboard", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Housing and Home",
    icons: [
      { name: "House", iconName: "home", iconFamily: "FontAwesome" },
      { name: "Apartment", iconName: "apartment", iconFamily: "MaterialIcons" },
      { name: "Furniture", iconName: "sofa", iconFamily: "MaterialCommunityIcons" },
      { name: "Appliances", iconName: "washing-machine", iconFamily: "MaterialCommunityIcons" },
      { name: "Refrigerator", iconName: "fridge", iconFamily: "MaterialCommunityIcons" },
      { name: "Garden", iconName: "flower-poppy", iconFamily: "MaterialCommunityIcons" },
      { name: "Bed", iconName: "bed", iconFamily: "MaterialCommunityIcons" },
      { name: "Lightbulb", iconName: "lightbulb-on", iconFamily: "MaterialCommunityIcons" },
      { name: "Key", iconName: "key-variant", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Travel and Adventure",
    icons: [
      { name: "Airplane", iconName: "airplane-takeoff", iconFamily: "MaterialCommunityIcons" },
      { name: "Suitcase", iconName: "briefcase-account", iconFamily: "MaterialCommunityIcons" },
      { name: "Passport", iconName: "passport", iconFamily: "MaterialCommunityIcons" },
      { name: "Map", iconName: "map-marker", iconFamily: "FontAwesome" },
      { name: "Beach", iconName: "beach", iconFamily: "MaterialCommunityIcons" },
      { name: "Mountain", iconName: "mountain-sun", iconFamily: "FontAwesome6" },
      { name: "Globe", iconName: "earth", iconFamily: "MaterialCommunityIcons" },
      { name: "Camping", iconName: "tent", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Education and Personal Development",
    icons: [
      { name: "Book", iconName: "book", iconFamily: "FontAwesome" },
      { name: "Graduation", iconName: "school", iconFamily: "MaterialIcons" },
      { name: "Pencil", iconName: "pencil", iconFamily: "FontAwesome" },
      { name: "Brain", iconName: "brain", iconFamily: "MaterialCommunityIcons" },
      { name: "Gym", iconName: "dumbbell", iconFamily: "MaterialCommunityIcons" },
      { name: "Certificate", iconName: "certificate", iconFamily: "FontAwesome" },
      { name: "Ideas", iconName: "lightbulb-on-outline", iconFamily: "MaterialCommunityIcons" },
      { name: "Computer", iconName: "monitor", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Health and Wellness",
    icons: [
      { name: "Heart", iconName: "heart-pulse", iconFamily: "MaterialCommunityIcons" },
      { name: "First Aid Kit", iconName: "medical-bag", iconFamily: "MaterialCommunityIcons" },
      { name: "Hospital", iconName: "hospital-box-outline", iconFamily: "MaterialCommunityIcons" },
      { name: "Diet", iconName: "food-apple", iconFamily: "MaterialCommunityIcons" },
      { name: "Sleep", iconName: "sleep", iconFamily: "MaterialCommunityIcons" },
      { name: "Yoga", iconName: "yoga", iconFamily: "MaterialCommunityIcons" },
      { name: "Running", iconName: "run", iconFamily: "MaterialCommunityIcons" },
      { name: "Water", iconName: "water", iconFamily: "MaterialCommunityIcons" },
      { name: "Protection", iconName: "face-mask", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Finance and Savings",
    icons: [
      { name: "Piggy Bank", iconName: "piggy-bank", iconFamily: "FontAwesome5" },
      { name: "Money", iconName: "cash", iconFamily: "MaterialCommunityIcons" },
      { name: "Wallet", iconName: "wallet", iconFamily: "MaterialCommunityIcons" },
      { name: "Coin", iconName: "coins", iconFamily: "FontAwesome6" },
      { name: "Bank", iconName: "bank", iconFamily: "MaterialCommunityIcons" },
      { name: "Stock Market", iconName: "chart-line", iconFamily: "MaterialCommunityIcons" },
      { name: "Credit Card", iconName: "credit-card", iconFamily: "FontAwesome" },
      { name: "Bitcoin", iconName: "bitcoin", iconFamily: "FontAwesome6" },
      { name: "Graph", iconName: "finance", iconFamily: "MaterialCommunityIcons" },
      { name: "Safe", iconName: "safe", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Events and Celebrations",
    icons: [
      { name: "Ring (Wedding)", iconName: "ring", iconFamily: "MaterialCommunityIcons" },
      { name: "Party", iconName: "party-popper", iconFamily: "MaterialCommunityIcons" },
      { name: "Gift", iconName: "gift", iconFamily: "FontAwesome" },
      { name: "Cake", iconName: "cake", iconFamily: "MaterialCommunityIcons" },
      { name: "Balloon", iconName: "balloon-sharp", iconFamily: "Ionicons" },
      { name: "Music", iconName: "music", iconFamily: "FontAwesome" },
      { name: "Wine Glass", iconName: "glass-wine", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Family and Children",
    icons: [
      { name: "Baby Stroller", iconName: "baby-carriage", iconFamily: "MaterialCommunityIcons" },
      { name: "Family", iconName: "family-restroom", iconFamily: "MaterialIcons" },
      { name: "Toy", iconName: "toy-brick", iconFamily: "MaterialCommunityIcons" },
      { name: "Baby Bottle", iconName: "baby-bottle", iconFamily: "MaterialCommunityIcons" },
      { name: "Games", iconName: "puzzle", iconFamily: "MaterialCommunityIcons" },
      { name: "Family Heart", iconName: "heart-multiple", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Work and Career",
    icons: [
      { name: "Briefcase", iconName: "briefcase", iconFamily: "FontAwesome" },
      { name: "Office", iconName: "office-building", iconFamily: "MaterialCommunityIcons" },
      { name: "Meeting", iconName: "calendar-check", iconFamily: "MaterialCommunityIcons" },
      { name: "Growth Chart", iconName: "chart-bar", iconFamily: "MaterialCommunityIcons" },
      { name: "Office Computer", iconName: "monitor-dashboard", iconFamily: "MaterialCommunityIcons" },
      { name: "Document", iconName: "file-document-outline", iconFamily: "MaterialCommunityIcons" },
      { name: "Growth", iconName: "trending-up", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Towards the Future",
    icons: [
      { name: "Retirement", iconName: "piggy-bank-outline", iconFamily: "MaterialCommunityIcons" },
      { name: "Star", iconName: "star-four-points", iconFamily: "MaterialCommunityIcons" },
      { name: "Dream", iconName: "lightbulb-on-outline", iconFamily: "MaterialCommunityIcons" },
      { name: "Rocket", iconName: "rocket-launch-outline", iconFamily: "MaterialCommunityIcons" },
      { name: "World", iconName: "globe-light", iconFamily: "MaterialCommunityIcons" },
      { name: "Hourglass", iconName: "hourglass-start", iconFamily: "FontAwesome" },
      { name: "Medal", iconName: "medal", iconFamily: "MaterialCommunityIcons" },
    ],
  },
  {
    title: "Other", // For icons that don't fit into a clear category but are useful
    icons: [
      { name: "Pet", iconName: "paw", iconFamily: "FontAwesome" },
      { name: "Music", iconName: "music-note", iconFamily: "MaterialIcons" },
      { name: "Book", iconName: "book-bookmark", iconFamily: "FontAwesome6" },
      { name: "Trash", iconName: "delete", iconFamily: "MaterialIcons" },
      { name: "Gear", iconName: "cog", iconFamily: "FontAwesome" },
      { name: "Ruler", iconName: "ruler", iconFamily: "MaterialCommunityIcons" },
    ],
  },
];
