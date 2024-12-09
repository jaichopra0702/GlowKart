import React, { useState, useRef, useEffect,createContext,useContext } from 'react';
import { Send, Minimize2, X } from 'lucide-react';
import '../Components/Chatbot.css';

// Predefined responses for common skincare questions

const products = [
    // Acne Category
    { id: 1, name: 'Acne Treatment Gel', category: 'Acne', price: 1500, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1090912/C-iRhDQGuO-4103040895554_1.jpg' },
    { id: 2, name: 'Acne Moisturizer', category: 'Acne', price: 1200, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1127303/k9WJ3RrB4B-1127303_2.jpg' },
    { id: 3, name: 'Blemish Control Serum', category: 'Acne', price: 1700, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1088060/m2K-vZNrDa-8901030902017_2.jpg' },
    { id: 4, name: 'Acne Spot Treatment', category: 'Acne', price: 1600, imageUrl: 'https://ybpskin.com/wp-content/uploads/2023/07/ybp-ceramide-8b-510x510.jpg' },
    { id: 5, name: 'Acne Cleansing Foam', category: 'Acne', price: 1400, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/the-derma-co/COMBO_231205115118-WW1/1/VpavZ22-iG-1083452_Combo_49-2.jpg' },
    { id: 6, name: 'Acne control Sunscreen', category: 'Acne', price: 1800, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/917049/vl_HhGZ_9-917049_1.jpg' },
  
    // Dry Skin Category
    { id: 7, name: 'Hydrating Moisturizer', category: 'DrySkin', price: 1800, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1090175/1dJAZaaN0F-1090175_3.jpg' },
    { id: 8, name: 'Deep Moisture Balm', category: 'DrySkin', price: 2000, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1116011/e1NCfiCDZQ-8906060214482_1.jpg' },
    { id: 9, name: 'Nourishing Night Cream', category: 'DrySkin', price: 2200, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1080531/5n334TDqhe-8901725995225_1.jpg' },
    { id: 10, name: 'Soothing Facial Oil', category: 'DrySkin', price: 2100, imageUrl: 'https://www.bing.com/th?id=OPAC.gJVtKjwzeI1gCw474C474&o=5&pid=21.1&w=124&h=146&rs=1&qlt=100&dpr=1.5&bw=6&bc=FFFFFF' },
    { id: 11, name: 'Revitalizing Face Mask', category: 'DrySkin', price: 2300, imageUrl: 'https://www.bing.com/th?id=OPAC.4j%2f2TOpno7cogQ474C474&o=5&pid=21.1&w=136&h=136&rs=1&qlt=100&dpr=1.5&pcl=f5f5f5' },
    { id: 12, name: 'Moisturizing Sunscreen', category: 'DrySkin', price: 1500, imageUrl: 'https://www.bing.com/th?id=OIP.KcvpOLNfCWqElkgpZhAb2gHaHa&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' },
  
    // Oily Skin Category
    { id: 13, name: 'Oil Control Lotion', category: 'OilySkin', price: 1300, imageUrl: 'https://www.bing.com/th?id=OPAC.sIljtNSj30k8eQ474C474&o=5&pid=21.1&w=124&h=124&rs=1&qlt=100&dpr=1.5&bw=6&bc=FFFFFF' },
    { id: 14, name: 'Oil Control Cleanser', category: 'OilySkin', price: 1400, imageUrl: 'https://www.bing.com/th?id=OPAC.hFGeWPZop%2bQPNQ474C474&o=5&pid=21.1&w=136&h=158&rs=1&qlt=100&dpr=1.5&pcl=f5f5f5' },
    { id: 15, name: 'Mattifying Moisturizer', category: 'OilySkin', price: 1600, imageUrl: 'https://th.bing.com/th?id=OPAC.%2bl5TnHUrU762Sw474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
    { id: 16, name: 'Pore Minimizing Serum', category: 'OilySkin', price: 1500, imageUrl: 'https://th.bing.com/th?id=OPAC.jwkHCZgq5wTGTw474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
    { id: 17, name: 'Oil Absorbing Sheets', category: 'OilySkin', price: 1000, imageUrl: 'https://th.bing.com/th?id=OPAC.Gr5jZumF6gPnJA474C474&w=220&h=220&c=17&o=5&dpr=1.5&pid=21.1' },
    { id: 18, name: 'Oil-Free Sunscreen', category: 'OilySkin', price: 1800, imageUrl: 'https://th.bing.com/th?id=OPAC.6LAyHUEw9KZc2g474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
  
    // Pigmentation Category
    { id: 19, name: 'Tinted Sunscreen', category: 'Pigmentation', price: 1400, imageUrl: 'https://www.bing.com/th?id=OPAC.mwnVpYTTc5Apkg474C474&o=5&pid=21.1&w=160&h=226&rs=1&qlt=100&dpr=1.5&c=8&pcl=f5f5f5' },
    { id: 20, name: 'Brightening Serum', category: 'Pigmentation', price: 1800, imageUrl: 'https://www.bing.com/th?id=OPAC.3W4JQ%2fMHq2Nv4g474C474&o=5&pid=21.1&w=160&h=185&rs=1&qlt=100&dpr=1.5&c=8&pcl=f5f5f5' },
    { id: 21, name: 'Spot Corrector', category: 'Pigmentation', price: 1900, imageUrl: 'https://th.bing.com/th?id=OPAC.pyrjzrfAVNrHSQ474C474&w=128&h=168&rs=1&pcl=f5f5f5&o=6&dpr=1.5&pid=21.1' },
    { id: 22, name: 'Pigment Control Cream', category: 'Pigmentation', price: 1600, imageUrl: 'https://th.bing.com/th?id=OPAC.5PpSX3BBDVCgYA474C474&w=128&h=128&rs=1&pcl=f5f5f5&o=6&dpr=1.5&pid=21.1' },
    { id: 23, name: 'Brightening Face Mask', category: 'Pigmentation', price: 1700, imageUrl: 'https://th.bing.com/th?id=OPAC.myy9kotU%2fnUMQg474C474&w=220&h=220&c=17&o=5&dpr=1.5&pid=21.1'},
    { id: 24, name: 'Even Tone Night Cream', category: 'Pigmentation', price: 2000, imageUrl: 'https://th.bing.com/th?id=OPAC.q8moSpimmtYo2w474C474&w=171&h=150&c=17&dpr=1.5&pid=21.1' },
  
    // Sensitive Skin Category
    { id: 25, name: 'PLANT REMEDY Skin Elixir 10ml', category: 'SensitiveSkin', price: 1250, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/original/1119782/8f1zEzbKN_-1119782_5.jpg?dpr=2' },
    { id: 26, name: 'Exfoliating Cleanser 100ml', category: 'SensitiveSkin', price: 1350, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/original/1053568/iKfjoFBIZX-1053568_3.jpg?dpr=2' },
    { id: 27, name: 'HYDRATING CHIA CREAM 30ml', category: 'SensitiveSkin', price: 1250, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1140048/_iSwl6ApWG-1140048-1.jpg' },
    { id: 28, name: 'Soothing Facial Mist', category: 'SensitiveSkin', price: 1400, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1132344/zHuqxeH926-1132344-2.jpg' },
    { id: 29, name: 'Calming Face Mask', category: 'SensitiveSkin', price: 1500, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1122544/zUoUgTKSm3-1122544_1.jpg' },
    { id: 30, name: 'Sensitive Skin Sunscreen', category: 'SensitiveSkin', price: 1600, imageUrl: 'https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1108204/ZUTz_Idifb-1108204_2.jpg' },
  
    // Combination Skin Category
  { id: 31, name: 'Acne Treatment Gel', category: 'CombinationSkin', price: 1500, imageUrl: 'https://th.bing.com/th?id=OPAC.WKOL%2bbHQqCv2rQ474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 32, name: 'Acne Moisturizer', category: 'CombinationSkin', price: 1200, imageUrl: 'https://th.bing.com/th?id=OPAC.rQuUGZisl66pQQ474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 33, name: 'Blemish Control Serum', category: 'CombinationSkin', price: 1700, imageUrl: 'https://th.bing.com/th?id=OPAC.9vhgeGS1vt2ZbA474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 34, name: 'Balancing Toner', category: 'CombinationSkin', price: 1400, imageUrl: 'https://th.bing.com/th?id=OPAC.usJdT6SufQwbkw474C474&w=220&h=210&c=17&o=5&dpr=1.5&pid=21.1' },
  { id: 35, name: 'Combination Skin Cleanser', category: 'CombinationSkin', price: 1600, imageUrl: 'https://th.bing.com/th?id=OPAC.zg66jsQsR%2b9Rog474C474&w=196&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 36, name: 'Hydration Balance Sunscreen', category: 'CombinationSkin', price: 1800, imageUrl: 'https://th.bing.com/th?id=OPAC.UfK%2fxHNRTCN3YA474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
  
  // Textured Skin Category
  { id: 37, name: 'Hydrating Moisturizer', category: 'TexturedSkin', price: 1800, imageUrl: 'https://th.bing.com/th?id=OPAC.qQao%2b5Gofr%2bKuA474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 38, name: 'Deep Moisture Sunscreen', category: 'TexturedSkin', price: 2000, imageUrl: 'https://th.bing.com/th?id=OPAC.OHa%2f6IaYy%2fdgoA474C474&w=160&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 39, name: 'Texture Refining Serum', category: 'TexturedSkin', price: 1900, imageUrl: 'https://th.bing.com/th?id=OPAC.MRAJrspScaJV6A474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 40, name: 'Exfoliating Night Cream', category: 'TexturedSkin', price: 2200, imageUrl: 'https://th.bing.com/th?id=OPAC.z%2f4YLYOtXVnjUQ474C474&w=169&h=150&c=17&dpr=1.5&pid=21.1' },
  { id: 41, name: 'Pore Smoothing Primer', category: 'TexturedSkin', price: 1600, imageUrl: 'https://th.bing.com/th?id=OPAC.Du0UzEpcrt0BtA474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
  { id: 42, name: 'Smoothing Face Mask', category: 'TexturedSkin', price: 1800, imageUrl: 'https://th.bing.com/th?id=OPAC.iUg8tDjCIFTnuQ474C474&w=200&h=220&c=17&dpr=1.5&pid=21.1' },
  ];
  
const ChatBot = () => {
    // Skincare knowledge base
    const skincareResponses = {
        acne: {
          keywords: ['acne', 'pimple', 'breakout', 'spots'],
          response: "For acne-prone skin, I recommend:\n\n" + 
          "Key Ingredients:\n" + 
          "• Salicylic acid\n" + 
          "• Benzoyl peroxide\n" + 
          "• Niacinamide\n\n" + 
          "Skincare Tips:\n" + 
          "• Use a gentle cleanser\n" + 
          "• Apply spot treatments\n" + 
          "• Don't over-wash your face\n" + 
          "• Keep skin hydrated\n\n" + 
          "Recommended Products:\n" + 
          products.filter(p => p.category === 'Acne')
            .map(p => `• ${p.name} - ₹${p.price}`)
            .join('\n') + 
          "\n\nWould you like more details about these products?",
        },
        dryness: {
          keywords: ['dry', 'flaky', 'tight', 'dehydrated'],
          response: "For dry skin, focus on:\n\n" + 
          "Key Hydrating Ingredients:\n" + 
          "• Hyaluronic acid\n" + 
          "• Ceramides\n" + 
          "• Glycerin\n" + 
          "• Squalane\n\n" + 
          "Recommended Routine:\n" + 
          "• Creamy, non-foaming cleanser\n" + 
          "• Hydrating toner\n" + 
          "• Hyaluronic acid serum\n" + 
          "• Rich moisturizer\n" + 
          "• Face oil (optional)\n\n" + 
          "Recommended Products:\n" + 
          products.filter(p => p.category === 'DrySkin')
            .map(p => `• ${p.name} - ₹${p.price}`)
            .join('\n') + 
          "\n\nWould you like to know more about hydrating your skin?",
        },
        aging: {
          keywords: ['aging', 'wrinkle', 'fine lines', 'mature'],
          response: "For anti-aging concerns, focus on:\n\n" + 
          "Key Anti-Aging Ingredients:\n" + 
          "• Retinol (Vitamin A)\n" + 
          "• Peptides\n" + 
          "• Vitamin C\n" + 
          "• Hyaluronic acid\n" + 
          "• Niacinamide\n\n" + 
          "Anti-Aging Skincare Tips:\n" + 
          "• Use sunscreen daily\n" + 
          "• Stay hydrated\n" + 
          "• Get enough sleep\n" + 
          "• Maintain a consistent routine\n\n" + 
          "Recommended Products:\n" + 
          products.filter(p => p.category === 'Pigmentation')
            .map(p => `• ${p.name} - ₹${p.price}`)
            .join('\n') + 
          "\n\nWould you like a recommended anti-aging routine?",
        },
        sensitive: {
          keywords: ['sensitive', 'redness', 'irritated', 'reaction'],
          response: "For sensitive skin, focus on:\n\n" + 
          "Soothing Ingredients:\n" + 
          "• Centella Asiatica\n" + 
          "• Aloe Vera\n" + 
          "• Chamomile\n" + 
          "• Green Tea\n\n" + 
          "Sensitive Skin Tips:\n" + 
          "• Use fragrance-free products\n" + 
          "• Patch test new products\n" + 
          "• Avoid harsh exfoliants\n" + 
          "• Use lukewarm water\n\n" + 
          "Recommended Products:\n" + 
          products.filter(p => p.category === 'SensitiveSkin')
            .map(p => `• ${p.name} - ₹${p.price}`)
            .join('\n') + 
          "\n\nWould you like tips for calming sensitive skin?",
        },
        routine: {
          keywords: ['routine', 'steps', 'order', 'regimen'],
          response: "Basic Skincare Routine:\n\n" + 
          "Morning Routine:\n" + 
          "1. Cleanser\n" + 
          "2. Toner (optional)\n" + 
          "3. Vitamin C serum\n" + 
          "4. Moisturizer\n" + 
          "5. Sunscreen\n\n" + 
          "Evening Routine:\n" + 
          "1. Double cleanse\n" + 
          "2. Toner\n" + 
          "3. Treatment (retinol/acids)\n" + 
          "4. Moisturizer\n\n" + 
          "Routine Tips:\n" + 
          "• Be consistent\n" + 
          "• Apply products from thinnest to thickest\n" + 
          "• Allow each layer to absorb\n" + 
          "• Don't skip sunscreen\n\n" + 
          "Recommended Products:\n" + 
          [
            ...products.filter(p => p.category === 'CombinationSkin'),
            ...products.filter(p => p.name.toLowerCase().includes('sunscreen'))
          ].map(p => `• ${p.name} - ₹${p.price}`)
          .join('\n') + 
          "\n\nWould you like details about any of these steps?",
        },
        sunscreen: {
          keywords: ['sunscreen', 'spf', 'sun protection', 'uv'],
          response: "Sunscreen Essentials:\n\n" + 
          "Key Sun Protection Tips:\n" + 
          "• Use SPF 30 or higher\n" + 
          "• Apply as last skincare step\n" + 
          "• Reapply every 2 hours when outside\n" + 
          "• Choose broad-spectrum protection\n\n" + 
          "Sunscreen Application Guidelines:\n" + 
          "• Use 1/4 teaspoon for face\n" + 
          "• Apply 15 minutes before sun exposure\n" + 
          "• Don't forget neck and ears\n" + 
          "• Reapply after swimming or sweating\n\n" + 
          "Recommended Sunscreens:\n" + 
          products.filter(p => p.name.toLowerCase().includes('sunscreen'))
            .map(p => `• ${p.name} - ₹${p.price}`)
            .join('\n') + 
          "\n\nWould you like sunscreen recommendations for your skin type?",
        }
      };
  
      const [isOpen, setIsOpen] = useState(() => {
        return localStorage.getItem('chatbotOpen') === 'true';
      });
  
      const [messages, setMessages] = useState(() => {
        // Try to load messages from localStorage, or use default welcome message
        const savedMessages = localStorage.getItem('chatbotMessages');
        return savedMessages ? JSON.parse(savedMessages) : [
          {
            text: "Hi! I'm your skincare AI assistant. I can help you with skincare advice and any other questions you have. How can I assist you today?",
            sender: 'bot'
          }
        ];
      });
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const generateResponse = (input) => {
      const inputLower = input.toLowerCase();
      
      // Check for skincare-specific questions first
      for (const [category, data] of Object.entries(skincareResponses)) {
        if (data.keywords.some(keyword => inputLower.includes(keyword))) {
          return data.response;
        }
      }
  
      // Handle general queries
      if (inputLower.match(/^(hi|hello|hey|greetings).*/)) {
        return "Hello! I'm here to help with your skincare concerns and any other questions. What would you like to know?";
      }
  
      if (inputLower.includes("help") || inputLower.includes("what can you do")) {
        return "I can help you with:\n• Skincare routines and product recommendations\n• Specific skin concerns (acne, aging, dryness, etc.)\n• General skincare advice\n• And any other questions you might have!\n\nWhat would you like to learn about?";
      }
  
      // Handle questions about products or ingredients
      if (inputLower.includes("ingredient") || inputLower.includes("product")) {
        return "I can help you understand skincare ingredients and products. Could you tell me which specific ingredient or product type you're interested in?";
      }
  
      // Handle thank you messages
      if (inputLower.match(/.*(thanks|thank you|appreciate).*/)) {
        return "You're welcome! Remember that consistent skincare routine is key to seeing results. Let me know if you need any other skincare advice!";
      }
  
      // Handle goodbyes
      if (inputLower.match(/.*(bye|goodbye|see you|farewell).*/)) {
        return "Goodbye! Don't forget your sunscreen! Feel free to come back if you need more skincare advice.";
      }
  
      // Process general questions
      if (inputLower.includes("?")) {
        return "That's an interesting question about " + input.toLowerCase().replace("?", "") + ". To provide the most helpful advice, could you tell me:\n1. Your skin type\n2. Any specific concerns\n3. Current skincare routine (if any)";
      }
  
      // Default response
      return "I understand you're interested in " + input + ". To provide better advice, could you tell me about your skin type and main concerns? This will help me give you more personalized recommendations.";
    };
  
    const handleSend = () => {
      if (!inputText.trim()) return;
  
      setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);
      setIsTyping(true);
  
      setTimeout(() => {
        const response = generateResponse(inputText);
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
        setIsTyping(false);
      }, Math.random() * 1000 + 500);
  
      setInputText('');
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="chat-button"
        >
          Chat with us!
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <h3 className="chat-title">Skincare Assistant</h3>
            <div className="header-buttons">
              <button onClick={() => setIsOpen(false)} className="header-button">
                <Minimize2 size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="header-button">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="chat-input"
              />
              <button
                onClick={handleSend}
                className="send-button"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;