
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Language options
const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文 (Mandarin)" },
  { code: "ta", label: "தமிழ் (Tamil)" }
];

// Translation mapping for UI elements
const translations = {
  en: {
    title: "Dr. Universal",
    description: "Describe your symptoms in detail to receive a preliminary assessment. Remember, this is not a replacement for professional medical advice.",
    symptomsLabel: "Describe your symptoms",
    symptomsPlaceholder: "Example: I've had a persistent headache for the last 3 days, along with fatigue and slight dizziness...",
    getAssessment: "Get Assessment",
    analyzing: "Analyzing...",
    assessmentTitle: "Preliminary Assessment",
    scheduleAppointment: "Schedule Appointment",
    disclaimer: "Disclaimer: The information provided is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
    back: "Back to Dashboard",
  },
  zh: {
    title: "环球医生",
    description: "详细描述您的症状，以获得初步评估。请记住，这不能替代专业医疗建议。",
    symptomsLabel: "描述您的症状",
    symptomsPlaceholder: "例如：过去3天我一直头痛，伴有疲劳和轻微头晕...",
    getAssessment: "获取评估",
    analyzing: "分析中...",
    assessmentTitle: "初步评估",
    scheduleAppointment: "预约就诊",
    disclaimer: "免责声明：所提供的信息仅供参考，不能替代专业医疗建议、诊断或治疗。如果您对健康状况有任何疑问，请咨询您的医生或其他合格的医疗服务提供者。",
    back: "返回控制面板",
  },
  ta: {
    title: "டாக்டர் யுனிவர்சல்",
    description: "ஆரம்ப மதிப்பீட்டைப் பெற உங்கள் அறிகுறிகளை விரிவாக விவரிக்கவும். இது தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக அல்ல என்பதை நினைவில் கொள்ளவும்.",
    symptomsLabel: "உங்கள் அறிகுறிகளை விவரிக்கவும்",
    symptomsPlaceholder: "உதாரணம்: கடந்த 3 நாட்களாக தொடர்ந்து தலைவலியுடன், சோர்வு மற்றும் சிறிது தலைச்சுற்றல் ஏற்பட்டுள்ளது...",
    getAssessment: "மதிப்பீடு பெறுக",
    analyzing: "பகுப்பாய்வு செய்கிறது...",
    assessmentTitle: "ஆரம்ப மதிப்பீடு",
    scheduleAppointment: "சந்திப்பை திட்டமிடு",
    disclaimer: "பொறுப்புத்துறப்பு: வழங்கப்படும் தகவல் தகவல் நோக்கங்களுக்காக மட்டுமே, மேலும் தொழில்முறை மருத்துவ ஆலோசனை, கண்டறிதல் அல்லது சிகிச்சைக்கு மாற்றாக இல்லை. மருத்துவ நிலைமை குறித்து உங்களுக்கு ஏதேனும் கேள்விகள் இருந்தால், எப்போதும் உங்கள் மருத்துவர் அல்லது பிற தகுதிவாய்ந்த சுகாதார வழங்குநரின் ஆலோசனையைக் கோருங்கள்.",
    back: "டாஷ்போர்டுக்குத் திரும்பு",
  },
};

// Language detection function (simple version)
const detectLanguage = (text: string) => {
  // Simple language detection based on character sets
  const hasChineseChars = /[\u4E00-\u9FFF]/.test(text);
  const hasTamilChars = /[\u0B80-\u0BFF]/.test(text);
  
  if (hasChineseChars) return "zh";
  if (hasTamilChars) return "ta";
  return "en"; // default to English
};

// Mock diagnoses responses in different languages
const getMockDiagnosis = (symptoms: string, language: string) => {
  const detectedLanguage = detectLanguage(symptoms);
  const responseLanguage = language || detectedLanguage;
  
  if (symptoms.toLowerCase().includes("headache") || symptoms.includes("头痛") || symptoms.includes("தலைவலி")) {
    if (responseLanguage === "zh") {
      return "根据您的症状，您可能正在经历紧张性头痛。这可能是由于压力、脱水或眼睛疲劳引起的。如果症状持续超过3天，建议咨询全科医生。";
    } else if (responseLanguage === "ta") {
      return "உங்கள் அறிகுறிகளின் அடிப்படையில், நீங்கள் இறுக்கமான தலைவலியை அனுபவிக்கலாம். இது அழுத்தம், நீரிழப்பு அல்லது கண் சோர்வு காரணமாக இருக்கலாம். அறிகுறிகள் 3 நாட்களுக்கு மேல் தொடர்ந்தால், பொது மருத்துவரை ஆலோசிக்க பரிந்துரைக்கப்படுகிறது.";
    } 
    return "Based on your symptoms, you might be experiencing tension headaches. This could be due to stress, dehydration, or eye strain. Recommend consulting with a general practitioner if symptoms persist for more than 3 days.";
  } 
  else if (symptoms.toLowerCase().includes("cough") || symptoms.includes("咳嗽") || symptoms.includes("இருமல்")) {
    if (responseLanguage === "zh") {
      return "您的症状表明上呼吸道感染。休息、补水和非处方咳嗽药物可能有所帮助。如果您出现发烧或呼吸困难，请立即咨询医疗专业人员。";
    } else if (responseLanguage === "ta") {
      return "உங்கள் அறிகுறிகள் மேல் சுவாச பாதையில் தொற்றைக் குறிக்கின்றன. ஓய்வு, நீர்ப்பாளம் மற்றும் மருந்து இல்லாத இருமல் மருந்து உதவலாம். காய்ச்சல் அல்லது சுவாசிப்பதில் சிரமம் ஏற்பட்டால், உடனடியாக ஒரு மருத்துவ வழங்குநரைக் கலந்தாலோசிக்கவும்.";
    }
    return "Your symptoms suggest an upper respiratory infection. Rest, hydration, and over-the-counter cough medicine may help. If you develop fever or difficulty breathing, please consult a healthcare provider immediately.";
  } 
  else {
    if (responseLanguage === "zh") {
      return "根据提供的有限信息，我们建议咨询医疗专业人员以获得适当的诊断。请记住，这不能替代专业医疗建议。";
    } else if (responseLanguage === "ta") {
      return "வழங்கப்பட்ட குறைந்த தகவலின் அடிப்படையில், சரியான கண்டறிதலுக்கு ஒரு சுகாதார நிபுணரை ஆலோசிக்க பரிந்துரைக்கிறோம். இது தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக அல்ல என்பதை நினைவில் கொள்ளுங்கள்.";
    }
    return "Based on the limited information provided, we recommend consulting with a healthcare professional for a proper diagnosis. Remember that this is not a substitute for professional medical advice.";
  }
};

const DrUniversal = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<string>("en");
  const { toast } = useToast();

  // Get translations for the selected language
  const t = translations[language as keyof typeof translations];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for diagnosis
    setTimeout(() => {
      const result = getMockDiagnosis(symptoms, language);
      setDiagnosis(result);
      setIsLoading(false);
      
      toast({
        title: t.assessmentTitle,
        description: "Assessment completed in your selected language",
      });
    }, 1500);
  };

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  // Auto-detect language when symptoms change (optional feature)
  useEffect(() => {
    if (symptoms.length > 10) {
      const detectedLang = detectLanguage(symptoms);
      if (detectedLang !== language) {
        // Only auto-switch if we detect non-English with confidence
        if (detectedLang !== "en") {
          setLanguage(detectedLang);
          toast({
            title: "Language detected",
            description: `Switched to ${languages.find(l => l.code === detectedLang)?.label || detectedLang}`,
          });
        }
      }
    }
  }, [symptoms]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/patient" className="flex items-center text-blue-600">
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t.back}
            </Link>
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">MedConnect</span>
            </div>
            
            {/* Language selector */}
            <div className="flex items-center">
              <Languages className="h-5 w-5 text-gray-500 mr-2" />
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-6">
            <Search className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          </div>
          
          <p className="text-gray-700 mb-8">
            {t.description}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                {t.symptomsLabel}
              </label>
              <textarea 
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full min-h-32 rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t.symptomsPlaceholder}
                required
              />
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || symptoms.trim() === ""}
              >
                {isLoading ? t.analyzing : t.getAssessment}
              </Button>
            </div>
          </form>
          
          {diagnosis && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{t.assessmentTitle}</h2>
              <p className="text-gray-700">{diagnosis}</p>
              <div className="mt-4">
                <Link to="/patient/ms-carey">
                  <Button className="bg-green-600 hover:bg-green-700">
                    {t.scheduleAppointment}
                  </Button>
                </Link>
              </div>
            </div>
          )}
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              <strong>{t.disclaimer.split(':')[0]}:</strong> {t.disclaimer.split(':')[1]}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DrUniversal;
