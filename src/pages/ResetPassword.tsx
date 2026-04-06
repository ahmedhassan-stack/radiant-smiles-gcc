import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // User arrived via recovery link — they can now set a new password
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (password !== confirm) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError("حدث خطأ أثناء تحديث كلمة المرور");
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/admin"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4" dir="rtl">
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <span className="text-5xl block">🔐</span>
          <h1 className="text-2xl font-extrabold text-foreground font-tajawal">تعيين كلمة مرور جديدة</h1>
        </div>

        {error && <p className="text-red-500 text-center font-tajawal text-sm bg-red-50 rounded-lg py-2">{error}</p>}

        {success ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 text-green-700 rounded-lg p-4 font-tajawal text-sm flex items-center justify-center gap-2">
              <Check size={18} /> تم تحديث كلمة المرور بنجاح! جاري التحويل...
            </div>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">كلمة المرور الجديدة</label>
              <div className="relative">
                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-input rounded-lg pr-10 pl-10 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground font-tajawal mb-1">تأكيد كلمة المرور</label>
              <div className="relative">
                <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  className="w-full border border-input rounded-lg pr-10 pl-4 py-2.5 bg-background font-tajawal focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold font-tajawal hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
