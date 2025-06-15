
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/hooks/useSession";

type Mode = "login" | "signup";

const AuthPage = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // signup only
  const [phone, setPhone] = useState(""); // signup only
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSession();

  // Redirect if already logged in
  if (!authLoading && user) {
    navigate("/");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Clean up old state (prevent Supabase limbo bug)
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) localStorage.removeItem(key);
      });
    } catch {}

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Login successful", description: "Welcome back!" });
      window.location.href = "/";
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Clean up old state
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) localStorage.removeItem(key);
      });
    } catch {}

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone },
        emailRedirectTo: window.location.origin + "/",
      }
    });
    setLoading(false);

    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ 
        title: "Sign up successful", 
        description: "Check your email to confirm your account! (Open in same browser)", 
      });
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-restaurant-primary">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>
        <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
          {mode === "signup" && (
            <>
              <Input 
                type="text" 
                placeholder="Name" 
                required 
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
              <Input 
                type="tel" 
                placeholder="Phone (optional)" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </>
          )}
          <Input 
            type="email" 
            placeholder="Email" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input 
            type="password" 
            placeholder="Password" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
          <Button disabled={loading} className="w-full mt-2" type="submit">
            {loading ? (mode === "login" ? "Logging in..." : "Signing up...") : (mode === "login" ? "Login" : "Create Account")}
          </Button>
        </form>
        <div className="mt-6 text-center text-gray-500">
          {mode === "login" ? (
            <>
              Don't have an account?
              <button className="text-restaurant-primary ml-1 underline" onClick={() => setMode("signup")}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button className="text-restaurant-primary ml-1 underline" onClick={() => setMode("login")}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
