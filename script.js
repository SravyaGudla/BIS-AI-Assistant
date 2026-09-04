/* =========================================================
   BIS AI ASSISTANT
   Vanilla JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const API_ENDPOINT = "http://localhost:3000/api/chat";

const LANGUAGE_CODES = {
  en: "en-IN",
  te: "te-IN",
  ta: "ta-IN",
  hi: "hi-IN",
  kn: "kn-IN",
  mr: "mr-IN"
};

/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {
  en: {
    newChat: "New Chat",
    search: "Search chats",
    chats: "Chats",
    settings: "Settings",
    help: "Help & FAQ",
    about: "About",
    send: "Send",
    camera: "Camera",
    microphone: "Microphone",
    attach: "Attach",
    welcomeTitle: "BIS AI Assistant",
    welcomeSubtitle: "How can I help you today?",
    example1: "What is BIS?",
    example2: "What is hallmarking?",
    example3: "Explain standardization services.",
    example4: "Tell me about Indian Standards.",
    inputPlaceholder: "Ask about BIS, standards, hallmarking..."
  },

  te: {
    newChat: "కొత్త చాట్",
    search: "చాట్‌లను శోధించండి",
    chats: "చాట్‌లు",
    settings: "సెట్టింగ్స్",
    help: "సహాయం & FAQ",
    about: "గురించి",
    send: "పంపండి",
    camera: "కెమెరా",
    microphone: "మైక్రోఫోన్",
    attach: "జోడించండి",
    welcomeTitle: "BIS AI సహాయకుడు",
    welcomeSubtitle: "ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
    example1: "BIS అంటే ఏమిటి?",
    example2: "హాల్‌మార్కింగ్ అంటే ఏమిటి?",
    example3: "ప్రామాణీకరణ సేవలను వివరించండి.",
    example4: "భారతీయ ప్రమాణాల గురించి చెప్పండి.",
    inputPlaceholder: "BIS, ప్రమాణాలు, హాల్‌మార్కింగ్ గురించి అడగండి..."
  },

  ta: {
    newChat: "புதிய உரையாடல்",
    search: "உரையாடல்களைத் தேடுங்கள்",
    chats: "உரையாடல்கள்",
    settings: "அமைப்புகள்",
    help: "உதவி & FAQ",
    about: "பற்றி",
    send: "அனுப்பு",
    camera: "கேமரா",
    microphone: "மைக்ரோஃபோன்",
    attach: "இணைக்கவும்",
    welcomeTitle: "BIS AI உதவியாளர்",
    welcomeSubtitle: "இன்று நான் உங்களுக்கு எப்படி உதவலாம்?",
    example1: "BIS என்றால் என்ன?",
    example2: "ஹால்மார்க்கிங் என்றால் என்ன?",
    example3: "தரநிலைப்படுத்தல் சேவைகளை விளக்குங்கள்.",
    example4: "இந்திய தரநிலைகள் பற்றி சொல்லுங்கள்.",
    inputPlaceholder: "BIS, தரநிலைகள், ஹால்மார்க்கிங் பற்றி கேளுங்கள்..."
  },

  hi: {
    newChat: "नई चैट",
    search: "चैट खोजें",
    chats: "चैट",
    settings: "सेटिंग्स",
    help: "सहायता और FAQ",
    about: "के बारे में",
    send: "भेजें",
    camera: "कैमरा",
    microphone: "माइक्रोफ़ोन",
    attach: "संलग्न करें",
    welcomeTitle: "BIS AI सहायक",
    welcomeSubtitle: "आज मैं आपकी कैसे सहायता कर सकता हूँ?",
    example1: "BIS क्या है?",
    example2: "हॉलमार्किंग क्या है?",
    example3: "मानकीकरण सेवाओं को समझाइए।",
    example4: "भारतीय मानकों के बारे में बताइए।",
    inputPlaceholder: "BIS, मानकों, हॉलमार्किंग के बारे में पूछें..."
  },

  kn: {
    newChat: "ಹೊಸ ಚಾಟ್",
    search: "ಚಾಟ್‌ಗಳನ್ನು ಹುಡುಕಿ",
    chats: "ಚಾಟ್‌ಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    help: "ಸಹಾಯ ಮತ್ತು FAQ",
    about: "ಕುರಿತು",
    send: "ಕಳುಹಿಸಿ",
    camera: "ಕ್ಯಾಮೆರಾ",
    microphone: "ಮೈಕ್ರೋಫೋನ್",
    attach: "ಲಗತ್ತಿಸಿ",
    welcomeTitle: "BIS AI ಸಹಾಯಕ",
    welcomeSubtitle: "ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    example1: "BIS ಎಂದರೇನು?",
    example2: "ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್ ಎಂದರೇನು?",
    example3: "ಪ್ರಮಾಣೀಕರಣ ಸೇವೆಗಳನ್ನು ವಿವರಿಸಿ.",
    example4: "ಭಾರತೀಯ ಮಾನದಂಡಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.",
    inputPlaceholder: "BIS, ಮಾನದಂಡಗಳು, ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್ ಬಗ್ಗೆ ಕೇಳಿ..."
  },

  mr: {
    newChat: "नवीन चॅट",
    search: "चॅट शोधा",
    chats: "चॅट्स",
    settings: "सेटिंग्ज",
    help: "मदत आणि FAQ",
    about: "माहिती",
    send: "पाठवा",
    camera: "कॅमेरा",
    microphone: "मायक्रोफोन",
    attach: "जोडा",
    welcomeTitle: "BIS AI सहाय्यक",
    welcomeSubtitle: "आज मी तुम्हाला कशी मदत करू शकतो?",
    example1: "BIS म्हणजे काय?",
    example2: "हॉलमार्किंग म्हणजे काय?",
    example3: "मानकीकरण सेवा समजावून सांगा.",
    example4: "भारतीय मानकांबद्दल सांगा.",
    inputPlaceholder: "BIS, मानके, हॉलमार्किंगबद्दल विचारा..."
  }
};

/* =========================================================
   DEMO RESPONSES
   ========================================================= */

const demoResponses = {
  en: {
    bis: `BIS stands for the Bureau of Indian Standards. It is India's national standards body.

BIS develops and promotes Indian Standards for products, processes and services. It also provides activities such as product certification, hallmarking, laboratory recognition, training and conformity assessment.

This is a prototype demonstration response. A production system should retrieve verified information from official BIS data sources.`,

    hallmarking: `Hallmarking is a system used to indicate the purity or fineness of precious metal articles such as gold and silver.

In India, BIS operates the hallmarking framework for applicable precious metal articles. A hallmark helps consumers identify the declared purity of the article.

For actual certification or regulatory requirements, users should verify the current requirements with official BIS sources.`,

    standards: `Standardization services help establish consistent requirements for products, processes and services.

BIS develops Indian Standards through technical committees and stakeholder participation. Standards can support quality, safety, compatibility, performance and consumer protection.

This prototype uses a demonstration answer until a real BIS knowledge backend is connected.`,

    indian: `Indian Standards are standards developed or adopted by the Bureau of Indian Standards.

They can specify requirements, test methods, performance criteria, terminology, dimensions and other technical requirements depending on the subject.

A production BIS AI Assistant should search an authoritative BIS standards database to identify the exact applicable standard.`
  },

  te: {
    bis: `BIS అంటే Bureau of Indian Standards (బ్యూరో ఆఫ్ ఇండియన్ స్టాండర్డ్స్).

ఇది భారతదేశ జాతీయ ప్రమాణాల సంస్థ. ఉత్పత్తులు, ప్రక్రియలు మరియు సేవలకు సంబంధించిన భారతీయ ప్రమాణాలను అభివృద్ధి చేసి ప్రోత్సహిస్తుంది.

ఇది ప్రోటోటైప్ డెమో సమాధానం. నిజమైన వ్యవస్థ అధికారిక BIS డేటా నుండి ధృవీకరించిన సమాచారాన్ని పొందాలి.`,

    hallmarking: `హాల్‌మార్కింగ్ అనేది బంగారం మరియు వెండి వంటి విలువైన లోహాల స్వచ్ఛతను సూచించే వ్యవస్థ.

భారతదేశంలో వర్తించే విలువైన లోహ వస్తువుల కోసం BIS హాల్‌మార్కింగ్ వ్యవస్థను నిర్వహిస్తుంది.

ప్రస్తుత నియమాలు మరియు అవసరాల కోసం అధికారిక BIS సమాచారాన్ని ధృవీకరించాలి.`,

    standards: `ప్రామాణీకరణ సేవలు ఉత్పత్తులు, ప్రక్రియలు మరియు సేవలకు ఒకే విధమైన అవసరాలను ఏర్పరచడంలో సహాయపడతాయి.

BIS సాంకేతిక కమిటీలు మరియు భాగస్వాముల సహకారంతో భారతీయ ప్రమాణాలను అభివృద్ధి చేస్తుంది.`,

    indian: `భారతీయ ప్రమాణాలు BIS అభివృద్ధి చేసిన లేదా స్వీకరించిన ప్రమాణాలు.

వీటిలో పరీక్షా పద్ధతులు, పనితీరు ప్రమాణాలు, భద్రతా అవసరాలు మరియు ఇతర సాంకేతిక అంశాలు ఉండవచ్చు.`
  },

  hi: {
    bis: `BIS का अर्थ Bureau of Indian Standards है। यह भारत का राष्ट्रीय मानक निकाय है।

BIS उत्पादों, प्रक्रियाओं और सेवाओं के लिए भारतीय मानक विकसित और बढ़ावा देता है।

यह एक प्रोटोटाइप डेमो उत्तर है। वास्तविक सिस्टम को आधिकारिक BIS डेटा स्रोतों से सत्यापित जानकारी प्राप्त करनी चाहिए.`,

    hallmarking: `हॉलमार्किंग बहुमूल्य धातु की वस्तुओं की शुद्धता या फाइननेस बताने वाली प्रणाली है।

भारत में लागू बहुमूल्य धातु वस्तुओं के लिए BIS हॉलमार्किंग व्यवस्था संचालित करता है।

वर्तमान आवश्यकताओं के लिए आधिकारिक BIS जानकारी की पुष्टि करें.`,

    standards: `मानकीकरण सेवाएं उत्पादों, प्रक्रियाओं और सेवाओं के लिए एकसमान आवश्यकताएं स्थापित करने में सहायता करती हैं।

BIS तकनीकी समितियों और हितधारकों की भागीदारी से भारतीय मानक विकसित करता है.`,

    indian: `भारतीय मानक BIS द्वारा विकसित या अपनाए गए मानक हैं।

इनमें परीक्षण विधियां, प्रदर्शन मानदंड, सुरक्षा आवश्यकताएं और अन्य तकनीकी आवश्यकताएं शामिल हो सकती हैं।`
  },

  ta: {
    bis: `BIS என்பது Bureau of Indian Standards என்பதைக் குறிக்கிறது. இது இந்தியாவின் தேசிய தரநிலை அமைப்பாகும்.

இது பொருட்கள், செயல்முறைகள் மற்றும் சேவைகளுக்கான இந்திய தரநிலைகளை உருவாக்குகிறது.

இது ஒரு முன்மாதிரி பதில். உண்மையான அமைப்பு அதிகாரப்பூர்வ BIS தரவிலிருந்து தகவலைப் பெற வேண்டும்.`,

    hallmarking: `ஹால்மார்க்கிங் என்பது தங்கம் மற்றும் வெள்ளி போன்ற விலைமதிப்புள்ள உலோகங்களின் தூய்மையை குறிப்பிடும் அமைப்பாகும்.

இந்தியாவில் பொருந்தக்கூடிய விலைமதிப்புள்ள உலோகப் பொருட்களுக்கான ஹால்மார்க்கிங் அமைப்பை BIS நிர்வகிக்கிறது.`,

    standards: `தரநிலைப்படுத்தல் சேவைகள் பொருட்கள், செயல்முறைகள் மற்றும் சேவைகளுக்கான ஒரே மாதிரியான தேவைகளை உருவாக்க உதவுகின்றன.

BIS தொழில்நுட்பக் குழுக்கள் மற்றும் பங்குதாரர்களின் பங்கேற்புடன் இந்திய தரநிலைகளை உருவாக்குகிறது.`,

    indian: `இந்திய தரநிலைகள் BIS உருவாக்கிய அல்லது ஏற்றுக்கொண்ட தரநிலைகளாகும்.

இவற்றில் சோதனை முறைகள், செயல்திறன் அளவுகோல்கள், பாதுகாப்புத் தேவைகள் மற்றும் பிற தொழில்நுட்ப தேவைகள் இருக்கலாம்.`
  },

  kn: {
    bis: `BIS ಎಂದರೆ Bureau of Indian Standards. ಇದು ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ಮಾನದಂಡ ಸಂಸ್ಥೆಯಾಗಿದೆ.

ಇದು ಉತ್ಪನ್ನಗಳು, ಪ್ರಕ್ರಿಯೆಗಳು ಮತ್ತು ಸೇವೆಗಳಿಗೆ ಭಾರತೀಯ ಮಾನದಂಡಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸುತ್ತದೆ.

ಇದು ಪ್ರೋಟೋಟೈಪ್ ಪ್ರದರ್ಶನ ಉತ್ತರವಾಗಿದೆ. ನೈಜ ವ್ಯವಸ್ಥೆಯು ಅಧಿಕೃತ BIS ಡೇಟಾದಿಂದ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಬೇಕು.`,

    hallmarking: `ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್ ಚಿನ್ನ ಮತ್ತು ಬೆಳ್ಳಿಯಂತಹ ಅಮೂಲ್ಯ ಲೋಹಗಳ ಶುದ್ಧತೆಯನ್ನು ಸೂಚಿಸುವ ವ್ಯವಸ್ಥೆಯಾಗಿದೆ.

ಭಾರತದಲ್ಲಿ ಅನ್ವಯವಾಗುವ ಅಮೂಲ್ಯ ಲೋಹದ ವಸ್ತುಗಳಿಗೆ BIS ಹಾಲ್‌ಮಾರ್ಕಿಂಗ್ ವ್ಯವಸ್ಥೆಯನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.`,

    standards: `ಪ್ರಮಾಣೀಕರಣ ಸೇವೆಗಳು ಉತ್ಪನ್ನಗಳು, ಪ್ರಕ್ರಿಯೆಗಳು ಮತ್ತು ಸೇವೆಗಳಿಗೆ ಸಮಾನವಾದ ಅವಶ್ಯಕತೆಗಳನ್ನು ಸ್ಥಾಪಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.

BIS ತಾಂತ್ರಿಕ ಸಮಿತಿಗಳು ಮತ್ತು ಪಾಲುದಾರರ ಭಾಗವಹಿಸುವಿಕೆಯೊಂದಿಗೆ ಭಾರತೀಯ ಮಾನದಂಡಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸುತ್ತದೆ.`,

    indian: `ಭಾರತೀಯ ಮಾನದಂಡಗಳು BIS ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ ಅಥವಾ ಅಳವಡಿಸಿಕೊಂಡ ಮಾನದಂಡಗಳಾಗಿವೆ.

ಅವುಗಳಲ್ಲಿ ಪರೀಕ್ಷಾ ವಿಧಾನಗಳು, ಕಾರ್ಯಕ್ಷಮತೆ ಮಾನದಂಡಗಳು, ಸುರಕ್ಷತಾ ಅವಶ್ಯಕತೆಗಳು ಮತ್ತು ಇತರ ತಾಂತ್ರಿಕ ಅವಶ್ಯಕತೆಗಳು ಇರಬಹುದು.`
  },

  mr: {
    bis: `BIS म्हणजे Bureau of Indian Standards. ही भारताची राष्ट्रीय मानक संस्था आहे.

BIS उत्पादने, प्रक्रिया आणि सेवांसाठी भारतीय मानके विकसित करते.

हा प्रोटोटाइप डेमो प्रतिसाद आहे. वास्तविक प्रणालीने अधिकृत BIS डेटामधून सत्यापित माहिती मिळवली पाहिजे.`,

    hallmarking: `हॉलमार्किंग ही सोने आणि चांदीसारख्या मौल्यवान धातूंच्या वस्तूंची शुद्धता दर्शविणारी प्रणाली आहे.

भारतात लागू असलेल्या मौल्यवान धातूंच्या वस्तूंसाठी BIS हॉलमार्किंग व्यवस्था चालवते.`,

    standards: `मानकीकरण सेवा उत्पादने, प्रक्रिया आणि सेवांसाठी समान आवश्यकता निश्चित करण्यास मदत करतात.

BIS तांत्रिक समित्या आणि भागधारकांच्या सहभागाने भारतीय मानके विकसित करते.`,

    indian: `भारतीय मानके ही BIS ने विकसित किंवा स्वीकारलेली मानके आहेत.

यामध्ये चाचणी पद्धती, कार्यक्षमता निकष, सुरक्षा आवश्यकता आणि इतर तांत्रिक आवश्यकता असू शकतात.`
  }
};

/* =========================================================
   STATE
   ========================================================= */

let state = {
  currentChatId: null,
  selectedImage: null,
  selectedImageName: "",
  cameraStream: null,
  recognition: null,
  isListening: false
};

const STORAGE_KEYS = {
  chats: "bisAiChats",
  language: "bisAiLanguage",
  theme: "bisAiTheme",
  voiceOutput: "bisAiVoiceOutput"
};

/* =========================================================
   DOM REFERENCES
   ========================================================= */

const elements = {
  sidebar: document.getElementById("sidebar"),
  sidebarOverlay: document.getElementById("sidebarOverlay"),
  openSidebarBtn: document.getElementById("openSidebarBtn"),
  closeSidebarBtn: document.getElementById("closeSidebarBtn"),

  newChatBtn: document.getElementById("newChatBtn"),
  chatSearchInput: document.getElementById("chatSearchInput"),
  chatHistory: document.getElementById("chatHistory"),

  settingsBtn: document.getElementById("settingsBtn"),
  helpBtn: document.getElementById("helpBtn"),
  aboutBtn: document.getElementById("aboutBtn"),
  profileMenuBtn: document.getElementById("profileMenuBtn"),
  topProfileBtn: document.getElementById("topProfileBtn"),

  languageSelect: document.getElementById("languageSelect"),
  settingsLanguageSelect: document.getElementById(
    "settingsLanguageSelect"
  ),

  emptyState: document.getElementById("emptyState"),
  examplePrompts: document.getElementById("examplePrompts"),
  messages: document.getElementById("messages"),
  chatContainer: document.getElementById("chatContainer"),

  messageInput: document.getElementById("messageInput"),
  sendBtn: document.getElementById("sendBtn"),

  attachBtn: document.getElementById("attachBtn"),
  imageInput: document.getElementById("imageInput"),
  cameraBtn: document.getElementById("cameraBtn"),
  micBtn: document.getElementById("micBtn"),

  attachmentPreview: document.getElementById("attachmentPreview"),
  attachmentPreviewImage: document.getElementById(
    "attachmentPreviewImage"
  ),
  attachmentName: document.getElementById("attachmentName"),
  removeAttachmentBtn: document.getElementById(
    "removeAttachmentBtn"
  ),

  cameraModal: document.getElementById("cameraModal"),
  closeCameraBtn: document.getElementById("closeCameraBtn"),
  cancelCameraBtn: document.getElementById("cancelCameraBtn"),
  captureBtn: document.getElementById("captureBtn"),
  useCapturedBtn: document.getElementById("useCapturedBtn"),
  cameraVideo: document.getElementById("cameraVideo"),
  cameraCanvas: document.getElementById("cameraCanvas"),
  capturedImage: document.getElementById("capturedImage"),
  cameraError: document.getElementById("cameraError"),

  settingsModal: document.getElementById("settingsModal"),
  closeSettingsBtn: document.getElementById("closeSettingsBtn"),
  themeSelect: document.getElementById("themeSelect"),
  voiceOutputToggle: document.getElementById(
    "voiceOutputToggle"
  ),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),

  infoModal: document.getElementById("infoModal"),
  closeInfoBtn: document.getElementById("closeInfoBtn"),
  infoModalTitle: document.getElementById("infoModalTitle"),
  infoModalSubtitle: document.getElementById(
    "infoModalSubtitle"
  ),
  infoContent: document.getElementById("infoContent"),

  toast: document.getElementById("toast")
};

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  loadPreferences();
  attachEventListeners();
  renderChatHistory();

  const chats = getChats();

  if (chats.length > 0) {
    loadChat(chats[0].id);
  } else {
    startNewChat(false);
  }

  updateComposerState();
}

/* =========================================================
   EVENT LISTENERS
   ========================================================= */

function attachEventListeners() {
  elements.newChatBtn.addEventListener("click", () => {
    startNewChat(true);
    closeSidebar();
  });

  elements.openSidebarBtn.addEventListener("click", openSidebar);
  elements.closeSidebarBtn.addEventListener("click", closeSidebar);
  elements.sidebarOverlay.addEventListener("click", closeSidebar);

  elements.settingsBtn.addEventListener("click", () => {
    openModal(elements.settingsModal);
    closeSidebar();
  });

  elements.helpBtn.addEventListener("click", () => {
    showInfoModal("Help & FAQ", getHelpContent());
    closeSidebar();
  });

  elements.aboutBtn.addEventListener("click", () => {
    showInfoModal("About BIS AI Assistant", getAboutContent());
    closeSidebar();
  });

  elements.profileMenuBtn.addEventListener("click", () => {
    showToast("Prototype profile menu");
  });

  elements.topProfileBtn.addEventListener("click", () => {
    showToast("Prototype profile menu");
  });

  elements.languageSelect.addEventListener("change", handleLanguageChange);

  elements.settingsLanguageSelect.addEventListener(
    "change",
    handleSettingsLanguageChange
  );

  elements.themeSelect.addEventListener("change", (event) => {
    setTheme(event.target.value);
  });

  elements.voiceOutputToggle.addEventListener("change", (event) => {
    safeSetStorage(
      STORAGE_KEYS.voiceOutput,
      String(event.target.checked)
    );
  });

  elements.clearHistoryBtn.addEventListener(
    "click",
    clearChatHistory
  );

  elements.chatSearchInput.addEventListener(
    "input",
    renderChatHistory
  );

  elements.examplePrompts.addEventListener("click", (event) => {
    const button = event.target.closest("[data-prompt]");

    if (!button) {
      return;
    }

    elements.messageInput.value = button.dataset.prompt;
    updateComposerState();
    sendCurrentMessage();
  });

  elements.messageInput.addEventListener("input", () => {
    autoResizeTextarea();
    updateComposerState();
  });

  elements.messageInput.addEventListener("keydown", handleInputKeydown);

  elements.sendBtn.addEventListener("click", sendCurrentMessage);

  elements.attachBtn.addEventListener("click", () => {
    elements.imageInput.click();
  });

  elements.imageInput.addEventListener(
    "change",
    handleImageSelection
  );

  elements.removeAttachmentBtn.addEventListener(
    "click",
    removeSelectedImage
  );

  elements.cameraBtn.addEventListener("click", openCamera);

  elements.closeCameraBtn.addEventListener("click", closeCamera);
  elements.cancelCameraBtn.addEventListener("click", closeCamera);

  elements.captureBtn.addEventListener("click", captureCameraImage);

  elements.useCapturedBtn.addEventListener(
    "click",
    useCapturedImage
  );

  elements.closeSettingsBtn.addEventListener("click", () => {
    closeModal(elements.settingsModal);
  });

  elements.closeInfoBtn.addEventListener("click", () => {
    closeModal(elements.infoModal);
  });

  elements.micBtn.addEventListener(
    "click",
    toggleVoiceRecognition
  );

  document.addEventListener("keydown", handleGlobalKeydown);
}

/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function safeGetStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch (error) {
    console.warn("localStorage read failed:", error);
    return fallback;
  }
}

function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn("localStorage write failed:", error);
    showToast("Unable to save this preference.");
    return false;
  }
}

function safeRemoveStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("localStorage remove failed:", error);
  }
}

function getChats() {
  const raw = safeGetStorage(STORAGE_KEYS.chats, "[]");

  try {
    const chats = JSON.parse(raw);
    return Array.isArray(chats) ? chats : [];
  } catch (error) {
    console.warn("Chat storage was invalid:", error);
    return [];
  }
}

function saveChats(chats) {
  safeSetStorage(STORAGE_KEYS.chats, JSON.stringify(chats));
}

/* =========================================================
   PREFERENCES
   ========================================================= */

function loadPreferences() {
  const savedLanguage = safeGetStorage(
    STORAGE_KEYS.language,
    "en"
  );

  const savedTheme = safeGetStorage(
    STORAGE_KEYS.theme,
    "light"
  );

  const savedVoice = safeGetStorage(
    STORAGE_KEYS.voiceOutput,
    "true"
  );

  const language = translations[savedLanguage]
    ? savedLanguage
    : "en";

  const theme =
    savedTheme === "dark" ? "dark" : "light";

  elements.languageSelect.value = language;
  elements.settingsLanguageSelect.value = language;

  elements.voiceOutputToggle.checked =
    savedVoice !== "false";

  setTheme(theme);
  applyTranslations(language);
}

function setTheme(theme) {
  const finalTheme = theme === "dark" ? "dark" : "light";

  document.documentElement.dataset.theme = finalTheme;

  elements.themeSelect.value = finalTheme;

  safeSetStorage(STORAGE_KEYS.theme, finalTheme);
}

function handleLanguageChange(event) {
  const language = event.target.value;

  if (!translations[language]) {
    return;
  }

  elements.settingsLanguageSelect.value = language;

  safeSetStorage(STORAGE_KEYS.language, language);

  applyTranslations(language);

  showToast("Language changed");
}

function handleSettingsLanguageChange(event) {
  const language = event.target.value;

  if (!translations[language]) {
    return;
  }

  elements.languageSelect.value = language;

  safeSetStorage(STORAGE_KEYS.language, language);

  applyTranslations(language);
}

function getCurrentLanguage() {
  const language = safeGetStorage(
    STORAGE_KEYS.language,
    "en"
  );

  return translations[language] ? language : "en";
}

function applyTranslations(language) {
  const dictionary =
    translations[language] || translations.en;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach((element) => {
      const key = element.dataset.i18nPlaceholder;

      if (dictionary[key]) {
        element.placeholder = dictionary[key];
      }
    });
}

/* =========================================================
   CHAT MANAGEMENT
   ========================================================= */

function createChat() {
  const now = new Date().toISOString();

  return {
    id: createId(),
    title: "New Chat",
    messages: [],
    createdAt: now,
    updatedAt: now
  };
}

function createId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  );
}

function startNewChat(saveCurrent = true) {
  if (saveCurrent && state.currentChatId) {
    persistCurrentChat();
  }

  const chat = createChat();

  const chats = getChats();
  chats.unshift(chat);

  saveChats(chats);

  state.currentChatId = chat.id;

  renderMessages([]);
  renderChatHistory();

  elements.emptyState.classList.remove("hidden");
  elements.messageInput.value = "";

  removeSelectedImage();
  updateComposerState();
  autoResizeTextarea();
}

function loadChat(chatId) {
  const chat = getChats().find(
    (item) => item.id === chatId
  );

  if (!chat) {
    return;
  }

  state.currentChatId = chatId;

  renderMessages(chat.messages || []);

  elements.emptyState.classList.toggle(
    "hidden",
    chat.messages && chat.messages.length > 0
  );

  renderChatHistory();
  updateComposerState();
}

function persistCurrentChat() {
  if (!state.currentChatId) {
    return;
  }

  const chats = getChats();
  const index = chats.findIndex(
    (chat) => chat.id === state.currentChatId
  );

  if (index === -1) {
    return;
  }

  chats[index].updatedAt = new Date().toISOString();

  saveChats(chats);
}

function addMessageToCurrentChat(message) {
  const chats = getChats();

  const index = chats.findIndex(
    (chat) => chat.id === state.currentChatId
  );

  if (index === -1) {
    return;
  }

  chats[index].messages.push(message);
  chats[index].updatedAt = new Date().toISOString();

  if (
    message.role === "user" &&
    chats[index].title === "New Chat"
  ) {
    chats[index].title = createChatTitle(message.content);
  }

  saveChats(chats);
}

function createChatTitle(message) {
  const cleaned = message
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "New Chat";
  }

  return cleaned.length > 38
    ? `${cleaned.slice(0, 38)}…`
    : cleaned;
}

function deleteChat(chatId, event) {
  if (event) {
    event.stopPropagation();
  }

  const confirmed = window.confirm(
    "Delete this chat?"
  );

  if (!confirmed) {
    return;
  }

  let chats = getChats();

  chats = chats.filter(
    (chat) => chat.id !== chatId
  );

  saveChats(chats);

  if (state.currentChatId === chatId) {
    state.currentChatId = null;

    if (chats.length > 0) {
      loadChat(chats[0].id);
    } else {
      startNewChat(false);
    }
  }

  renderChatHistory();
}

function clearChatHistory() {
  const confirmed = window.confirm(
    "Clear all saved chat history?"
  );

  if (!confirmed) {
    return;
  }

  safeRemoveStorage(STORAGE_KEYS.chats);

  state.currentChatId = null;

  startNewChat(false);

  closeModal(elements.settingsModal);

  showToast("Chat history cleared");
}

/* =========================================================
   CHAT HISTORY UI
   ========================================================= */

function renderChatHistory() {
  const chats = getChats();

  const query = elements.chatSearchInput.value
    .trim()
    .toLowerCase();

  elements.chatHistory.innerHTML = "";

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(query)
  );

  if (filteredChats.length === 0) {
    const empty = document.createElement("div");

    empty.className = "history-empty";
    empty.textContent = query
      ? "No matching chats."
      : "No previous chats.";

    elements.chatHistory.appendChild(empty);

    return;
  }

  filteredChats.forEach((chat) => {
    const wrapper = document.createElement("div");

    wrapper.className = "history-item";

    if (chat.id === state.currentChatId) {
      wrapper.classList.add("active");
    }

    const title = document.createElement("span");

    title.className = "history-title";
    title.textContent = chat.title;

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-chat-btn";
    deleteButton.textContent = "✕";
    deleteButton.setAttribute(
      "aria-label",
      "Delete chat"
    );

    deleteButton.addEventListener("click", (event) => {
      deleteChat(chat.id, event);
    });

    wrapper.addEventListener("click", () => {
      loadChat(chat.id);
      closeSidebar();
    });

    wrapper.appendChild(title);
    wrapper.appendChild(deleteButton);

    elements.chatHistory.appendChild(wrapper);
  });
}

/* =========================================================
   MESSAGE RENDERING
   ========================================================= */

function renderMessages(messages) {
  elements.messages.innerHTML = "";

  messages.forEach((message) => {
    renderMessage(message);
  });

  scrollChatToBottom();
}

function renderMessage(message) {
  const row = document.createElement("div");

  row.className = `message-row ${message.role === "user" ? "user" : "ai"}`;

  const messageElement = document.createElement("div");

  messageElement.className = "message";

  if (message.role === "ai") {
    const avatar = document.createElement("div");

    avatar.className = "ai-avatar";
    avatar.textContent = "BIS";

    messageElement.appendChild(avatar);
  }

  const body = document.createElement("div");

  body.className = "message-body";

  const bubble = document.createElement("div");

  bubble.className = "message-bubble";

  if (message.image) {
    const image = document.createElement("img");

    image.className = "message-image";
    image.src = message.image;
    image.alt = "Uploaded image";

    bubble.appendChild(image);
  }

  if (message.content) {
    const text = document.createElement("div");

    text.textContent = message.content;

    bubble.appendChild(text);
  }

  body.appendChild(bubble);

  if (message.role === "ai") {
    const actions = document.createElement("div");

    actions.className = "message-actions";

    const copyButton = createMessageAction(
      "Copy",
      "⧉",
      () => copyText(message.content)
    );

    const speakButton = createMessageAction(
      "Read aloud",
      "🔊",
      () => speakText(message.content)
    );

    const regenerateButton = createMessageAction(
      "Regenerate",
      "↻",
      () => regenerateLastResponse()
    );

    actions.appendChild(copyButton);
    actions.appendChild(speakButton);
    actions.appendChild(regenerateButton);

    body.appendChild(actions);
  }

  messageElement.appendChild(body);
  row.appendChild(messageElement);

  elements.messages.appendChild(row);
}

function createMessageAction(label, icon, callback) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "message-action";
  button.title = label;
  button.setAttribute("aria-label", label);

  button.textContent = icon;

  button.addEventListener("click", callback);

  return button;
}

function addTemporaryTypingIndicator() {
  const row = document.createElement("div");

  row.className = "message-row ai";
  row.id = "typingIndicator";

  const message = document.createElement("div");

  message.className = "message";

  const avatar = document.createElement("div");

  avatar.className = "ai-avatar";
  avatar.textContent = "BIS";

  const body = document.createElement("div");

  body.className = "message-body";

  const bubble = document.createElement("div");

  bubble.className = "message-bubble typing-bubble";

  const dots = document.createElement("div");

  dots.className = "typing-dots";

  for (let i = 0; i < 3; i += 1) {
    dots.appendChild(document.createElement("span"));
  }

  bubble.appendChild(dots);
  body.appendChild(bubble);

  message.appendChild(avatar);
  message.appendChild(body);

  row.appendChild(message);

  elements.messages.appendChild(row);

  scrollChatToBottom();
}

function removeTemporaryTypingIndicator() {
  const indicator =
    document.getElementById("typingIndicator");

  if (indicator) {
    indicator.remove();
  }
}

/* =========================================================
   SEND MESSAGE
   ========================================================= */

async function sendCurrentMessage() {
  const message = elements.messageInput.value.trim();

  if (!message && !state.selectedImage) {
    return;
  }

  const imageData = state.selectedImage;

  const userMessage = {
    id: createId(),
    role: "user",
    content: message,
    image: imageData,
    createdAt: new Date().toISOString()
  };

  addMessageToCurrentChat(userMessage);

  elements.emptyState.classList.add("hidden");

  renderMessage(userMessage);

  elements.messageInput.value = "";

  removeSelectedImage();

  autoResizeTextarea();
  updateComposerState();

  scrollChatToBottom();

  addTemporaryTypingIndicator();

  try {
    const reply = await sendMessageToBackend(
      message,
      getCurrentLanguage(),
      imageData
    );

    removeTemporaryTypingIndicator();

    const aiMessage = {
      id: createId(),
      role: "ai",
      content: reply,
      image: null,
      createdAt: new Date().toISOString()
    };

    addMessageToCurrentChat(aiMessage);
    renderMessage(aiMessage);

    renderChatHistory();

    scrollChatToBottom();
  } catch (error) {
    console.error("Message error:", error);

    removeTemporaryTypingIndicator();

    const demoReply = getDemoResponse(
      message,
      getCurrentLanguage(),
      Boolean(imageData)
    );

    const aiMessage = {
      id: createId(),
      role: "ai",
      content: demoReply,
      image: null,
      createdAt: new Date().toISOString()
    };

    addMessageToCurrentChat(aiMessage);
    renderMessage(aiMessage);

    renderChatHistory();

    scrollChatToBottom();

    showToast(
      "Backend unavailable — showing clearly marked demo response."
    );
  }
}

/* =========================================================
   BACKEND CONNECTION
   ========================================================= */

async function sendMessageToBackend(
  message,
  language,
  image
) {
  const payload = {
    message,
    language: LANGUAGE_CODES[language] || "en-IN",
    image: image || null
  };

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(payload),

      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(
        `Backend returned HTTP ${response.status}`
      );
    }

    const data = await response.json();

    if (
      !data ||
      typeof data.reply !== "string" ||
      !data.reply.trim()
    ) {
      throw new Error("Invalid backend response.");
    }

    return data.reply.trim();
  } finally {
    clearTimeout(timeout);
  }
}

/* =========================================================
   DEMO RESPONSE
   ========================================================= */

function getDemoResponse(
  message,
  language,
  hasImage = false
) {
  const normalized = message
    .toLowerCase()
    .trim();

  const responseSet =
    demoResponses[language] || demoResponses.en;

  let response;

  if (
    normalized.includes("hallmark") ||
    normalized.includes("హాల్") ||
    normalized.includes("हॉल") ||
    normalized.includes("ஹால்") ||
    normalized.includes("ಹಾಲ್")
  ) {
    response = responseSet.hallmarking;
  } else if (
    normalized.includes("standard") ||
    normalized.includes("प्रमाण") ||
    normalized.includes("தரநிலை") ||
    normalized.includes("ಮಾನದಂಡ") ||
    normalized.includes("मानक")
  ) {
    response = responseSet.standards;
  } else if (
    normalized.includes("indian standard") ||
    normalized.includes("ભારતીય") ||
    normalized.includes("भारतीय")
  ) {
    response = responseSet.indian;
  } else {
    response = responseSet.bis;
  }

  if (hasImage) {
    response += getImageDemoAddition(language);
  }

  return `[DEMO RESPONSE]\n\n${response}`;
}

function getImageDemoAddition(language) {
  const additions = {
    en: `\n\nImage received successfully. This prototype has displayed and passed the image to the backend interface, but no real image-analysis AI is connected yet.`,

    te: `\n\nచిత్రం విజయవంతంగా స్వీకరించబడింది. ప్రోటోటైప్ చిత్రాన్ని ప్రదర్శించి backend interface కు పంపింది. అయితే నిజమైన image-analysis AI ఇంకా కనెక్ట్ కాలేదు.`,

    ta: `\n\nபடம் வெற்றிகரமாக பெறப்பட்டது. இந்த முன்மாதிரி படத்தை backend interface-க்கு அனுப்பியுள்ளது. உண்மையான image-analysis AI இன்னும் இணைக்கப்படவில்லை.`,

    hi: `\n\nछवि सफलतापूर्वक प्राप्त हुई। इस प्रोटोटाइप ने छवि को backend interface तक भेजने के लिए तैयार किया है, लेकिन वास्तविक image-analysis AI अभी कनेक्ट नहीं है.`,

    kn: `\n\nಚಿತ್ರವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ಪ್ರೋಟೋಟೈಪ್ ಚಿತ್ರವನ್ನು backend interface ಗೆ ಕಳುಹಿಸಲು ಸಿದ್ಧಪಡಿಸಿದೆ. ಆದರೆ ನೈಜ image-analysis AI ಇನ್ನೂ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ.`,

    mr: `\n\nप्रतिमा यशस्वीपणे प्राप्त झाली. प्रोटोटाइपने प्रतिमा backend interface कडे पाठवण्यासाठी तयार केली आहे; मात्र वास्तविक image-analysis AI अद्याप जोडलेले नाही.`
  };

  return additions[language] || additions.en;
}

/* =========================================================
   REGENERATE
   ========================================================= */

async function regenerateLastResponse() {
  const chats = getChats();

  const chat = chats.find(
    (item) => item.id === state.currentChatId
  );

  if (!chat || !Array.isArray(chat.messages)) {
    return;
  }

  const lastUserIndex = [...chat.messages]
    .map((message) => message.role)
    .lastIndexOf("user");

  if (lastUserIndex === -1) {
    showToast("No user message to regenerate.");
    return;
  }

  const lastUserMessage =
    chat.messages[lastUserIndex];

  chat.messages = chat.messages.slice(
    0,
    lastUserIndex + 1
  );

  saveChats(chats);

  renderMessages(chat.messages);

  addTemporaryTypingIndicator();

  try {
    const reply = await sendMessageToBackend(
      lastUserMessage.content,
      getCurrentLanguage(),
      lastUserMessage.image || null
    );

    removeTemporaryTypingIndicator();

    const aiMessage = {
      id: createId(),
      role: "ai",
      content: reply,
      image: null,
      createdAt: new Date().toISOString()
    };

    addMessageToCurrentChat(aiMessage);
    renderMessage(aiMessage);
  } catch (error) {
    removeTemporaryTypingIndicator();

    const reply = getDemoResponse(
      lastUserMessage.content,
      getCurrentLanguage(),
      Boolean(lastUserMessage.image)
    );

    const aiMessage = {
      id: createId(),
      role: "ai",
      content: reply,
      image: null,
      createdAt: new Date().toISOString()
    };

    addMessageToCurrentChat(aiMessage);
    renderMessage(aiMessage);

    showToast(
      "Backend unavailable — regenerated with demo response."
    );
  }

  scrollChatToBottom();
}

/* =========================================================
   IMAGE UPLOAD
   ========================================================= */

function handleImageSelection(event) {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    showToast("Please select an image file.");
    event.target.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    showToast("Image must be smaller than 10 MB.");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    state.selectedImage = reader.result;
    state.selectedImageName = file.name;

    elements.attachmentPreviewImage.src =
      reader.result;

    elements.attachmentName.textContent =
      file.name;

    elements.attachmentPreview.classList.remove(
      "hidden"
    );

    updateComposerState();
  };

  reader.onerror = () => {
    showToast("Unable to read the selected image.");
  };

  reader.readAsDataURL(file);

  event.target.value = "";
}

function removeSelectedImage() {
  state.selectedImage = null;
  state.selectedImageName = "";

  elements.attachmentPreviewImage.removeAttribute(
    "src"
  );

  elements.attachmentName.textContent = "Image";

  elements.attachmentPreview.classList.add(
    "hidden"
  );

  updateComposerState();
}

/* =========================================================
   CAMERA
   ========================================================= */

async function openCamera() {
  resetCameraUI();

  openModal(elements.cameraModal);

  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {
    showCameraError(
      "Camera access is not supported in this browser."
    );

    return;
  }

  try {
    state.cameraStream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment"
          }
        },
        audio: false
      });

    elements.cameraVideo.srcObject =
      state.cameraStream;

    await elements.cameraVideo.play();
  } catch (error) {
    console.error("Camera error:", error);

    let message =
      "Unable to access the camera. Please check browser permissions.";

    if (error.name === "NotAllowedError") {
      message =
        "Camera permission was denied. Please allow camera access in your browser settings.";
    } else if (error.name === "NotFoundError") {
      message =
        "No camera was found on this device.";
    } else if (error.name === "NotReadableError") {
      message =
        "The camera is already being used by another application.";
    }

    showCameraError(message);
  }
}

function captureCameraImage() {
  if (!state.cameraStream) {
    showCameraError("Camera is not active.");
    return;
  }

  const video = elements.cameraVideo;
  const canvas = elements.cameraCanvas;

  if (
    !video.videoWidth ||
    !video.videoHeight
  ) {
    showCameraError(
      "Camera is not ready yet. Please try again."
    );

    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    showCameraError(
      "Unable to capture the camera image."
    );

    return;
  }

  context.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const imageData = canvas.toDataURL(
    "image/jpeg",
    0.88
  );

  elements.capturedImage.src = imageData;

  elements.cameraVideo.classList.add("hidden");
  elements.capturedImage.classList.remove(
    "hidden"
  );

  elements.captureBtn.classList.add("hidden");
  elements.useCapturedBtn.classList.remove(
    "hidden"
  );

  stopCameraStream();
}

function useCapturedImage() {
  const imageData =
    elements.capturedImage.getAttribute("src");

  if (!imageData) {
    showCameraError(
      "No captured image is available."
    );

    return;
  }

  state.selectedImage = imageData;
  state.selectedImageName = "Camera capture.jpg";

  elements.attachmentPreviewImage.src =
    imageData;

  elements.attachmentName.textContent =
    "Camera capture.jpg";

  elements.attachmentPreview.classList.remove(
    "hidden"
  );

  closeCamera();

  updateComposerState();
}

function closeCamera() {
  stopCameraStream();

  closeModal(elements.cameraModal);

  resetCameraUI();
}

function stopCameraStream() {
  if (state.cameraStream) {
    state.cameraStream
      .getTracks()
      .forEach((track) => track.stop());

    state.cameraStream = null;
  }

  elements.cameraVideo.srcObject = null;
}

function resetCameraUI() {
  elements.cameraVideo.classList.remove(
    "hidden"
  );

  elements.capturedImage.classList.add(
    "hidden"
  );

  elements.capturedImage.removeAttribute(
    "src"
  );

  elements.captureBtn.classList.remove(
    "hidden"
  );

  elements.useCapturedBtn.classList.add(
    "hidden"
  );

  elements.cameraError.classList.add(
    "hidden"
  );

  elements.cameraError.textContent = "";
}

function showCameraError(message) {
  elements.cameraError.textContent = message;
  elements.cameraError.classList.remove(
    "hidden"
  );

  elements.cameraVideo.classList.add("hidden");
}

/* =========================================================
   VOICE INPUT
   ========================================================= */

function getSpeechRecognitionConstructor() {
  return (
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    null
  );
}

function toggleVoiceRecognition() {
  if (state.isListening) {
    stopVoiceRecognition();
    return;
  }

  startVoiceRecognition();
}

function startVoiceRecognition() {
  const Recognition =
    getSpeechRecognitionConstructor();

  if (!Recognition) {
    showToast(
      "Voice input is not supported in this browser."
    );

    return;
  }

  const recognition = new Recognition();

  state.recognition = recognition;
  state.isListening = true;

  recognition.lang =
    LANGUAGE_CODES[getCurrentLanguage()] ||
    "en-IN";

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  elements.micBtn.classList.add("listening");
  elements.micBtn.textContent = "■";
  elements.micBtn.title = "Stop listening";

  const originalText =
    elements.messageInput.value;

  recognition.onresult = (event) => {
    let transcript = "";

    for (
      let i = event.resultIndex;
      i < event.results.length;
      i += 1
    ) {
      transcript +=
        event.results[i][0].transcript;
    }

    const separator =
      originalText.trim().length > 0
        ? " "
        : "";

    elements.messageInput.value =
      originalText + separator + transcript;

    autoResizeTextarea();
    updateComposerState();
  };

  recognition.onerror = (event) => {
    console.error(
      "Speech recognition error:",
      event.error
    );

    if (event.error === "not-allowed") {
      showToast(
        "Microphone permission was denied."
      );
    } else if (event.error === "no-speech") {
      showToast("No speech was detected.");
    } else {
      showToast(
        "Voice input could not be completed."
      );
    }
  };

  recognition.onend = () => {
    resetVoiceUI();
  };

  try {
    recognition.start();
  } catch (error) {
    console.error(
      "Unable to start speech recognition:",
      error
    );

    resetVoiceUI();

    showToast(
      "Unable to start voice input."
    );
  }
}

function stopVoiceRecognition() {
  if (state.recognition) {
    try {
      state.recognition.stop();
    } catch (error) {
      console.warn(
        "Speech recognition stop failed:",
        error
      );
    }
  }

  resetVoiceUI();
}

function resetVoiceUI() {
  state.isListening = false;
  state.recognition = null;

  elements.micBtn.classList.remove(
    "listening"
  );

  elements.micBtn.textContent = "🎙";
  elements.micBtn.title = "Voice input";
}

/* =========================================================
   VOICE OUTPUT
   ========================================================= */

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    showToast(
      "Voice output is not supported in this browser."
    );

    return;
  }

  if (
    !elements.voiceOutputToggle.checked
  ) {
    showToast(
      "Voice output is disabled in Settings."
    );

    return;
  }

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang =
    LANGUAGE_CODES[getCurrentLanguage()] ||
    "en-IN";

  utterance.rate = 0.95;
  utterance.pitch = 1;

  window.speechSynthesis.speak(
    utterance
  );
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/* =========================================================
   COPY
   ========================================================= */

async function copyText(text) {
  if (!text) {
    return;
  }

  try {
    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }

    showToast("Response copied.");
  } catch (error) {
    console.error(
      "Clipboard error:",
      error
    );

    showToast("Unable to copy response.");
  }
}

function fallbackCopy(text) {
  const textarea =
    document.createElement("textarea");

  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);

  textarea.select();

  document.execCommand("copy");

  textarea.remove();
}

/* =========================================================
   TEXTAREA
   ========================================================= */

function autoResizeTextarea() {
  const textarea = elements.messageInput;

  textarea.style.height = "auto";

  const maxHeight = 180;

  textarea.style.height =
    `${Math.min(
      textarea.scrollHeight,
      maxHeight
    )}px`;
}

function updateComposerState() {
  const hasText =
    elements.messageInput.value.trim()
      .length > 0;

  const hasImage =
    Boolean(state.selectedImage);

  elements.sendBtn.disabled =
    !hasText && !hasImage;
}

function handleInputKeydown(event) {
  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {
    event.preventDefault();

    if (!elements.sendBtn.disabled) {
      sendCurrentMessage();
    }
  }
}

/* =========================================================
   SCROLL
   ========================================================= */

function scrollChatToBottom() {
  requestAnimationFrame(() => {
    elements.chatContainer.scrollTop =
      elements.chatContainer.scrollHeight;
  });
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function openSidebar() {
  elements.sidebar.classList.add("open");
  elements.sidebarOverlay.classList.add(
    "visible"
  );
}

function closeSidebar() {
  elements.sidebar.classList.remove("open");
  elements.sidebarOverlay.classList.remove(
    "visible"
  );
}

/* =========================================================
   MODALS
   ========================================================= */

function openModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.add("hidden");

  if (
    elements.cameraModal.classList.contains(
      "hidden"
    ) &&
    elements.settingsModal.classList.contains(
      "hidden"
    ) &&
    elements.infoModal.classList.contains(
      "hidden"
    )
  ) {
    document.body.style.overflow = "";
  }
}

function showInfoModal(title, content) {
  elements.infoModalTitle.textContent = title;

  elements.infoModalSubtitle.textContent =
    "BIS AI Assistant prototype";

  elements.infoContent.innerHTML = content;

  openModal(elements.infoModal);
}

/* =========================================================
   HELP / ABOUT CONTENT
   ========================================================= */

function getHelpContent() {
  return `
    <h3>Using the prototype</h3>

    <ul>
      <li>Type a BIS-related question and press Enter.</li>
      <li>Use Shift + Enter to create a new line.</li>
      <li>Use the attachment button to select an image.</li>
      <li>Use the camera button to capture an image.</li>
      <li>Use the microphone button for voice input.</li>
      <li>Use the speaker button below an AI response for voice output.</li>
      <li>Use Settings to change language, theme and voice preferences.</li>
    </ul>

    <h3>Backend</h3>

    <p>
      The frontend attempts to send requests to
      <strong>POST /api/chat</strong>.
      If the backend is unavailable, the application displays
      a clearly labelled demonstration response instead of pretending
      that a real AI system processed the request.
    </p>
  `;
}

function getAboutContent() {
  return `
    <h3>BIS AI Assistant</h3>

    <p>
      This is a frontend prototype designed to demonstrate how an
      AI-powered BIS information assistant could work across desktop,
      tablet and Android mobile devices.
    </p>

    <h3>Prototype capabilities</h3>

    <ul>
      <li>Text conversation</li>
      <li>Image upload</li>
      <li>Camera capture</li>
      <li>Voice input</li>
      <li>Voice output</li>
      <li>Six-language interface</li>
      <li>Local chat history</li>
      <li>Light and dark themes</li>
    </ul>

    <p>
      Important BIS requirements and regulatory information should be
      verified against official BIS sources when the production system
      is implemented.
    </p>
  `;
}

/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;

function showToast(message) {
  clearTimeout(toastTimer);

  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");

  toastTimer = setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 3000);
}

/* =========================================================
   GLOBAL KEYBOARD
   ========================================================= */

function handleGlobalKeydown(event) {
  if (event.key === "Escape") {
    if (
      !elements.cameraModal.classList.contains(
        "hidden"
      )
    ) {
      closeCamera();
      return;
    }

    if (
      !elements.settingsModal.classList.contains(
        "hidden"
      )
    ) {
      closeModal(elements.settingsModal);
      return;
    }

    if (
      !elements.infoModal.classList.contains(
        "hidden"
      )
    ) {
      closeModal(elements.infoModal);
      return;
    }

    closeSidebar();
  }
}

/* =========================================================
   CLEANUP
   ========================================================= */

window.addEventListener("beforeunload", () => {
  stopCameraStream();
  stopVoiceRecognition();
  stopSpeech();
});

/* =========================================================
   END
   ========================================================= */