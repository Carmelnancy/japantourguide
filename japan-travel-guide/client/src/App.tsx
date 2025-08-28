

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Utensils, Landmark } from "lucide-react";
import { fetchPlaces, fetchFoods, fetchFestivals } from "./api";

type Doc = { _id: string; name: string; description?: string; image?: string; month?: string };

export default function App() {
  const [places, setPlaces] = useState<Doc[]>([]);
  const [foods, setFoods] = useState<Doc[]>([]);
  const [festivals, setFestivals] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [p, f, fe] = await Promise.all([
          fetchPlaces(),
          fetchFoods(),
          fetchFestivals(),
        ]);
        setPlaces(p);
        setFoods(f);
        setFestivals(fe);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 h-16 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 font-semibold ">
            <MapPin className="w-5 h-5 text-red-500" /> Japan Travel Guide
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
            <a className="hover:text-black" href="#festivals">Festivals</a>
            <a className="hover:text-black" href="#foods">Foods</a>
            <a className="hover:text-black" href="#places">Places</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-neutral-100">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-28 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Plan an unforgettable trip to Japan
            </h1>
            <p className="mt-4 text-neutral-600">
              From timeless temples to neon nights, steaming bowls of ramen to delicate sushi, and
              world‑famous festivals—discover what to see, eat, and experience.
            </p>
            <div className="mt-8 inline-flex gap-4">
              <a href="#places" style={{
                padding: '14px 24px',
                borderRadius: '12px',
                backgroundColor: '#1f2937',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: '2px solid #1f2937',
                cursor: 'pointer'
              }}>Explore Places</a>
              <a href="#foods" style={{
                padding: '14px 24px',
                borderRadius: '12px',
                backgroundColor: 'white',
                color: '#1f2937',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: '2px solid #e5e7eb',
                cursor: 'pointer'
              }}>Try Foods</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/kyoto.jpg" alt="Kyoto" loading="lazy" decoding="async" style={{width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e5e7eb'}} />
            <img src="/images/tokyo.jpg" alt="Tokyo" loading="lazy" decoding="async" style={{width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e5e7eb'}} />
            <img src="/images/festival-gion.jpg" alt="Gion" loading="lazy" decoding="async" style={{width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e5e7eb'}} />
            <img src="/images/festival-sapporo.jpg" alt="Sapporo" loading="lazy" decoding="async" style={{width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #e5e7eb'}} />
          </div>
        </div>
      </section>

      {/* Loading / Error */}
      {loading && (
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-20 text-neutral-600">Loading content…</div>
      )}
      {error && !loading && (
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-20 text-red-600">{error}</div>
      )}

      {/* Festivals */}
      {!loading && !error && (
        <section id="festivals" className="scroll-mt-16">
          <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-28">
            <h2 className="text-3xl font-bold mb-8 inline-flex items-center gap-2">
              <CalendarDays className="w-6 h-6" /> Festivals
            </h2>
            <p className="text-neutral-600 mb-6">Catch the energy of Japan’s seasonal celebrations—from Kyoto’s grand Gion Matsuri to Sapporo’s sparkling snow sculptures.</p>
            {festivals.length === 0 && (
              <div className="rounded-2xl border bg-white p-6 text-sm text-neutral-600">No festivals found yet. Seed the database or check back later.</div>
            )}
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" key="festivals-grid">
              {festivals.map((f) => (
                <li key={f._id} className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                  {f.image && (
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      decoding="async"
                      style={{width: '100%', height: '280px', objectFit: 'cover'}}
                    />
                  )}
                  <div style={{padding: '16px'}}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{f.name}</h3>
                        <p className="text-sm text-neutral-600 mt-1">{f.description}</p>
                      </div>
                                              {f.month && (
                          <span style={{
                            fontSize: '12px',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            border: '1px solid #fbbf24',
                            whiteSpace: 'nowrap',
                            fontWeight: '600',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                          }}>{f.month}</span>
                        )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Foods */}
      {!loading && !error && (
        <section id="foods" className="scroll-mt-16">
          <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-28">
            <h2 className="text-3xl font-bold mb-8 inline-flex items-center gap-2">
              <Utensils className="w-6 h-6" /> Foods
            </h2>
            <p className="text-neutral-600 mb-6">Taste Japan through regional specialties and beloved classics—perfect fuel for every itinerary.</p>
            {foods.length === 0 && (
              <div className="rounded-2xl border bg-white p-6 text-sm text-neutral-600">No foods available. Try seeding data to get started.</div>
            )}
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" key="foods-grid">
              {foods.map((food) => (
                <li key={food._id} className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                  {food.image && (
                    <img
                      src={food.image}
                      alt={food.name}
                      loading="lazy"
                      decoding="async"
                      style={{width: '100%', height: '280px', objectFit: 'cover'}}
                    />
                  )}
                  <div style={{padding: '16px'}}>
                    <h3 className="font-semibold">{food.name}</h3>
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{food.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Places */}
      {!loading && !error && (
        <section id="places" className="scroll-mt-16">
          <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-28">
            <h2 className="text-3xl font-bold mb-8 inline-flex items-center gap-2">
              <Landmark className="w-6 h-6" /> Places
            </h2>
            <p className="text-neutral-600 mb-6">Iconic cities and serene escapes—build your route with a mix of must‑see highlights and hidden gems.</p>
            {places.length === 0 && (
              <div className="rounded-2xl border bg-white p-6 text-sm text-neutral-600">No places yet. Seed the database to populate examples.</div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {places.map((p) => (
                <figure key={p._id} className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                  {p.image && (
                    <img 
                      alt={p.name} 
                      loading="lazy" 
                      decoding="async" 
                      style={{width: '100%', height: '280px', objectFit: 'cover'}} 
                      src={p.image} 
                    />
                  )}
                  <div style={{padding: '16px'}}>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-neutral-600 line-clamp-2">{p.description}</div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-20 text-sm text-neutral-600 flex items-center justify-center">
          <p className="text-center">© {new Date().getFullYear()} Japan Travel Guide</p>
        </div>
      </footer>
    </div>
  );
}
