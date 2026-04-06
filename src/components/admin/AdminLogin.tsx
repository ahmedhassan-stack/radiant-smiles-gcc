import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setError("حدث خطأ أثناء إرسال رابط إعادة التعيين");
    else setResetSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4" dir="rtl">
      <form onSubmit={resetMode ? handleReset : handleLogin} className="bg-card border border-border rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <span className="text-5xl block">🦷</span>
          <h1 className="text-2xl font-extrabold text-foreground font-tajawal">
            {resetMode ? "استعادة كلمة المرور" : "لوحة التحكم"}
          </h1>
          <p className="text-muted-foreground font-tajawal text-sm">عيادة الابتسامة</p>
        </div>

        {error && <p className="text-red-500 text-center font-tajawal text-sm bg-red-50 rounded-lg py-2">{error}</p>}

        {resetMode && resetSent ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 text-green-700 rounded-lg p-4 font-tajawal text-sm">
              ✅ تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني
            </div>
            <button type="button" onClick={() => { setResetMode(false); setResetSent(false); }} className="text-primary font-tajawal text-sm hover:underline">
              العودة لتسجيل الدخول
            </button>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@clinic.com"
                  className="w-full border border-input rounded-lg pr-10 pl-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            {!resetMode && (
              <div>
                <label className="block text-sm font-bold text-foreground font-tajawal mb-1">كلمة المرور</label>
                <div className="relative">
                  <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full border border-input rounded-lg pr-10 pl-10 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold font-tajawal hover:opacity-90 transition-opacity">
              {resetMode ? "إرسال رابط الاستعادة" : "تسجيل الدخول"}
            </button>
            <button type="button" onClick={() => { setResetMode(!resetMode); setError(""); setResetSent(false); }}
              className="w-full text-center text-primary font-tajawal text-sm hover:underline">
              {resetMode ? "العودة لتسجيل الدخول" : "نسيت كلمة المرور؟"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
