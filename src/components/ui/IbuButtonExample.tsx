"use client";

import { IbuButton } from "./IbuButton";

export default function IbuButtonExample() {
  return (
    <div className="p-8 space-y-6 bg-[#FCF8E3]">
      <h2 className="text-2xl font-bold text-[#053725] mb-4">Exemples d'utilisation du bouton IBÙ</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#053725] mb-2">Variante Primary (par défaut)</h3>
          <div className="flex gap-4 flex-wrap">
            <IbuButton href="/reservations">
              Réserver votre moment
            </IbuButton>
            <IbuButton href="/contact">
              Nous contacter
            </IbuButton>
            <IbuButton onClick={() => alert("Bouton cliqué !")}>
              Action personnalisée
            </IbuButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#053725] mb-2">Variante Inverted</h3>
          <div className="flex gap-4 flex-wrap">
            <IbuButton href="/about" variant="inverted">
              Découvrir IBÙ
            </IbuButton>
            <IbuButton href="/experiences" variant="inverted">
              Nos expériences
            </IbuButton>
            <IbuButton variant="inverted" onClick={() => alert("Bouton inversé cliqué !")}>
              Autre action
            </IbuButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#053725] mb-2">Avec classes personnalisées</h3>
          <div className="flex gap-4 flex-wrap">
            <IbuButton href="/partners" className="text-lg px-8 py-3">
              Bouton plus grand
            </IbuButton>
            <IbuButton variant="inverted" className="opacity-80 hover:opacity-100">
              Avec effet d'opacité
            </IbuButton>
          </div>
        </div>
      </div>
    </div>
  );
}
