export interface Category {
  name: string;
  iconName: string;
  iconFamily: string;
  type: "income" | "expense"; // Agregado el tipo 'type'
  isUserDefined: boolean; // Agregado el tipo 'isUserDefined'
}

const categories: Category[] = [
  // --- Categorías de Gastos ---
  {
    name: "Debts",
    iconName: "hand-holding-usd",
    iconFamily: "FontAwesome5",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Shopping",
    iconName: "shopping-cart",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Food",
    iconName: "food-fork-drink",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Phone",
    iconName: "phone-iphone",
    iconFamily: "MaterialIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Entertainment",
    iconName: "popcorn",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Education",
    iconName: "school",
    iconFamily: "MaterialIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Beauty",
    iconName: "face-woman",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Sports",
    iconName: "sports-soccer",
    iconFamily: "MaterialIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Social",
    iconName: "account-group",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Transport", // Corregí a mayúscula inicial para consistencia
    iconName: "train",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Clothing",
    iconName: "shirt",
    iconFamily: "FontAwesome6",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Car",
    iconName: "car",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Alcohol",
    iconName: "beer",
    iconFamily: "FontAwesome5",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Cigarettes",
    iconName: "smoking",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Electronics",
    iconName: "tablet-mobile-combo",
    iconFamily: "Entypo",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Travel",
    iconName: "plane",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Health",
    iconName: "heartbeat",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Pets",
    iconName: "dog",
    iconFamily: "FontAwesome5",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Repairs",
    iconName: "tools",
    iconFamily: "FontAwesome5",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Housing",
    iconName: "home",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Home",
    iconName: "sofa",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Lottery",
    iconName: "ticket-percent",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Snacks",
    iconName: "food-apple",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Kids",
    iconName: "baby-carriage",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Vegetables",
    iconName: "pepper-hot",
    iconFamily: "FontAwesome6",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Fruits",
    iconName: "fruit-watermelon",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Utilities",
    iconName: "lightbulb-on",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Insurance",
    iconName: "shield-check",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Taxes",
    iconName: "file-document-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Groceries",
    iconName: "basket",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Restaurants",
    iconName: "silverware-fork-knife",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Coffee",
    iconName: "coffee",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Subscriptions",
    iconName: "credit-card-settings-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Gym",
    iconName: "weight-lifter",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Personal Care",
    iconName: "face-mask",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Hobbies",
    iconName: "gamepad-variant",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Pet Supplies",
    iconName: "paw",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Bank Fees",
    iconName: "bank",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Legal",
    iconName: "gavel",
    iconFamily: "FontAwesome5",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Child Care",
    iconName: "baby-face-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Cleaning",
    iconName: "broom",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Gardening",
    iconName: "flower",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Vacation", // Meta de viaje/gasto
    iconName: "beach",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Car Purchase", // Meta de compra de coche
    iconName: "car-settings",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Emergency", // Meta de fondo de emergencia
    iconName: "shield-alert-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "New Business", // Meta de nuevo negocio
    iconName: "lightbulb-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Wedding", // Meta de boda
    iconName: "ring",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Renovation", // Meta de renovación
    iconName: "wrench",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Health Goal", // Meta de salud
    iconName: "heart-plus-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Savings", // Meta de ahorro general
    iconName: "piggy-bank",
    iconFamily: "FontAwesome5",
    type: "expense",
    isUserDefined: false,
  },

  // --- Categorías de Ingresos ---
  {
    name: "Salary",
    iconName: "cash",
    iconFamily: "MaterialCommunityIcons",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Freelance",
    iconName: "briefcase-check",
    iconFamily: "MaterialCommunityIcons",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Gifts", // Duplicada: Gifts (Income)
    iconName: "gift",
    iconFamily: "FontAwesome",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Refunds",
    iconName: "cash-refund",
    iconFamily: "MaterialCommunityIcons",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Bonus",
    iconName: "star-circle-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Rental Income",
    iconName: "home-account",
    iconFamily: "MaterialCommunityIcons",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Side Hustle",
    iconName: "rocket-launch-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Allowance",
    iconName: "child",
    iconFamily: "FontAwesome",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Pension",
    iconName: "account-tie-outline",
    iconFamily: "MaterialCommunityIcons",
    type: "income",
    isUserDefined: false,
  },

  // --- Categorías Duplicadas (Ingreso y Gasto) ---
  // Originalmente "Debts" (expense), ahora también como "Debts (Income)"
  {
    name: "Debts (Income)", // Cambiado el nombre para diferenciar en la UI
    iconName: "hand-holding-usd",
    iconFamily: "FontAwesome5",
    type: "income",
    isUserDefined: false,
  },
  // Originalmente "Investment" (expense/goal), ahora también como "Investment (Income)"
  {
    name: "Investment (Income)", // Duplicado para ingreso
    iconName: "chart-areaspline", // Usando un icono similar al de ingresos
    iconFamily: "MaterialCommunityIcons",
    type: "income",
    isUserDefined: false,
  },
  {
    name: "Investment (Expense)", // Duplicado para gasto/meta de inversión
    iconName: "chart-line",
    iconFamily: "MaterialCommunityIcons",
    type: "expense",
    isUserDefined: false,
  },
  {
    name: "Gifts (Expense)", // Duplicado para gasto (originalmente "Gifts")
    iconName: "gift",
    iconFamily: "FontAwesome",
    type: "expense",
    isUserDefined: false,
  },
];

export default categories;
