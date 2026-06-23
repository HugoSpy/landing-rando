"use client";

import React, { useState } from "react";
import Image from "next/image";

function CustomMountainLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="50,15 15,85 85,85" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="miter" />
      <polygon points="50,15 35,85 65,85" fill="none" stroke="currentColor" strokeWidth="4" />
      <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
    </svg>
  );
}

export default function SignupPage() {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", terms: false });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; terms?: string }>({});
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error as user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom complet est requis.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse e-mail est requise.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'adresse e-mail n'est pas valide.";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    }
    if (!formData.terms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate registration success
    setRegistered(true);
  };

  return (
    <main className="min-h-screen bg-neutral-50 font-sans text-neutral-900 flex flex-col justify-between selection:bg-primary-900 selection:text-white relative overflow-hidden">
      {/* Background misty landscape overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/neve_hero_bg_misty.jpg"
          alt=""
          fill
          priority
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/80 to-neutral-50"></div>
      </div>

      {/* Top logo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6">
        <a
          href="/"
          className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 rounded-lg cursor-pointer"
        >
          <CustomMountainLogo className="w-8 h-8 text-neutral-900 group-hover:scale-105 transition-transform duration-200" />
          <span className="font-black text-xl tracking-widest text-neutral-900 uppercase">Névé</span>
        </a>
      </div>

      {/* Card Content wrapper */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 my-10">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white/50 rounded-[32px] p-8 md:p-10 shadow-2xl transition-all duration-300">
          {!registered ? (
            <>
              <div className="mb-8 text-center sm:text-left">
                <span className="text-xs font-black uppercase tracking-widest text-primary-700">
                  REJOINDRE NÉVÉ
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 mt-1 leading-tight">
                  Inscrivez-vous gratuitement
                </h1>
                <p className="text-xs text-neutral-600 mt-2 font-normal">
                  Accédez à tous nos itinéraires et préparez vos micro-aventures sans voiture.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ex: Rémi Dupont"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full text-sm text-neutral-800 placeholder-neutral-400 font-medium px-4 py-3 bg-white border border-neutral-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all shadow-sm"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-[11px] font-semibold text-red-600 mt-1 pl-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email address */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
                    Adresse E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="remi.dupont@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-sm text-neutral-800 placeholder-neutral-400 font-medium px-4 py-3 bg-white border border-neutral-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all shadow-sm"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-[11px] font-semibold text-red-600 mt-1 pl-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Au moins 8 caractères"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full text-sm text-neutral-800 placeholder-neutral-400 font-medium px-4 py-3 bg-white border border-neutral-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-all shadow-sm"
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  {errors.password && (
                    <p id="password-error" className="text-[11px] font-semibold text-red-600 mt-1 pl-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-start gap-3 mt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-700 focus:ring-primary-700 cursor-pointer"
                      aria-invalid={errors.terms ? "true" : "false"}
                      aria-describedby={errors.terms ? "terms-error" : undefined}
                    />
                    <label htmlFor="terms" className="text-xs text-neutral-600 leading-normal cursor-pointer select-none font-normal">
                      J'accepte les conditions générales d'utilisation de Névé et la politique de confidentialité.
                    </label>
                  </div>
                  {errors.terms && (
                    <p id="terms-error" className="text-[11px] font-semibold text-red-600 mt-1 pl-1">
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md shadow-primary-950/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 mt-4 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Inscrivez-vous gratuitement
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-neutral-200/50 text-center">
                <a
                  href="/"
                  className="text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 rounded px-1.5 py-0.5"
                >
                  Retour à l'accueil
                </a>
              </div>
            </>
          ) : (
            // Success view: Prompts app download
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-700 mx-auto text-2xl shadow-sm">
                ✓
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-primary-700">
                  INSCRIPTION RÉUSSIE
                </span>
                <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
                  Bienvenue sur Névé !
                </h1>
                <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                  Votre compte a été créé avec succès. Pour planifier vos escapades en train et accéder à vos itinéraires sur le terrain, téléchargez gratuitement l'application.
                </p>
              </div>

              {/* Download CTA buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setDownloadMsg("L'application iOS sera disponible très bientôt sur l'App Store ! Nous vous enverrons un e-mail dès sa sortie.")}
                  className="w-full py-3.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Télécharger sur l'App Store</span>
                </button>
                <button
                  onClick={() => setDownloadMsg("L'application Android sera disponible très bientôt sur le Google Play Store ! Nous vous enverrons un e-mail dès sa sortie.")}
                  className="w-full py-3.5 bg-white border border-primary-200 hover:bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Télécharger sur Google Play</span>
                </button>

                {downloadMsg && (
                  <p className="text-xs font-semibold text-primary-700 mt-3 p-3 bg-primary-50 border border-primary-200/50 rounded-2xl leading-relaxed animate-fade-in">
                    {downloadMsg}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-200/50">
                <a
                  href="/"
                  className="w-full block text-center py-3 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
                >
                  Accéder à l'accueil
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 text-center border-t border-neutral-200/40 text-neutral-400 text-[10px] uppercase tracking-wider">
        &copy; {new Date().getFullYear()} Névé Randonnées. Tous droits réservés.
      </div>
    </main>
  );
}
