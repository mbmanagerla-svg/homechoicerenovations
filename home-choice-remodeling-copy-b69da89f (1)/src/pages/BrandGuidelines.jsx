import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">HC</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Home Choice Renovations — by Power Style
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Brand Identity Guidelines · Premium Home Renovations in Los Angeles
          </p>
        </div>

        <Tabs defaultValue="concept" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="concept">Concept</TabsTrigger>
            <TabsTrigger value="logo">Logo</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="imagery">Imagery</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          {/* CONCEPT TAB */}
          <TabsContent value="concept">
            <Card>
              <CardHeader>
                <CardTitle>Brand Concept & Philosophy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Brand Essence</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Home Choice Renovations — by Power Style represents premium home renovation services 
                    backed by 16+ years of licensed California construction excellence. The brand embodies 
                    trust, craftsmanship, and modern architectural precision while maintaining warmth and 
                    accessibility for the Latino community in Los Angeles.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-blue-900">Brand Attributes</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Premium quality without pretension</li>
                      <li>✓ California modern aesthetic</li>
                      <li>✓ Bilingual and culturally inclusive</li>
                      <li>✓ Licensed, insured, reliable</li>
                      <li>✓ Clean architectural lines</li>
                      <li>✓ Subtle luxury</li>
                      <li>✓ Professional confidence with clarity</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900 text-white p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3">Design Philosophy</h4>
                    <p className="text-gray-200 leading-relaxed">
                      Our visual identity reflects modern California architecture: clean lines, 
                      balanced proportions, and premium materials. We avoid generic construction 
                      imagery in favor of sophisticated, architectural precision.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LOGO TAB */}
          <TabsContent value="logo">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Logo System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Full Brand Name</h3>
                    <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-2xl">HC</span>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">Home Choice Renovations</div>
                          <div className="text-lg text-gray-600">by Power Style</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p>• "Home Choice Renovations" — Bold, prominent (Montserrat Bold 700)</p>
                      <p>• "by Power Style" — Lighter weight, refined (Montserrat Regular 400)</p>
                      <p>• Em dash (—) separator for premium feel</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3">Horizontal Layout</h4>
                      <div className="bg-gray-100 p-6 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">HC</span>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">Home Choice Renovations</div>
                            <div className="text-xs text-gray-600">by Power Style</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3">Stacked Layout</h4>
                      <div className="bg-gray-100 p-6 rounded-lg text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold">HC</span>
                        </div>
                        <div className="font-bold text-gray-900 text-sm">Home Choice Renovations</div>
                        <div className="text-xs text-gray-600">by Power Style</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Icon / Monogram</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-gray-100 p-8 rounded-lg mb-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto">
                          <span className="text-white font-bold text-2xl">HC</span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">HCR Monogram</p>
                      <p className="text-xs text-gray-600">App icons, favicons</p>
                    </div>

                    <div className="text-center">
                      <div className="bg-gray-900 p-8 rounded-lg mb-3">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto">
                          <span className="text-gray-900 font-bold text-2xl">HC</span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">Dark Background</p>
                      <p className="text-xs text-gray-600">Navigation, headers</p>
                    </div>

                    <div className="text-center">
                      <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 rounded-lg mb-3">
                        <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto">
                          <span className="text-white font-bold text-2xl">HC</span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">Gold Accent</p>
                      <p className="text-xs text-gray-600">Premium contexts</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold mb-2">Icon Construction</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Geometric house silhouette with peaked roof</li>
                      <li>• 45° roof angle for architectural precision</li>
                      <li>• Clean angular lines, minimal details</li>
                      <li>• Works at minimum 24x24px</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logo Usage Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-green-900 mb-3">✓ DO</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Maintain proper clear space</li>
                        <li>• Use approved color variations</li>
                        <li>• Scale proportionally</li>
                        <li>• Use on solid backgrounds</li>
                        <li>• Minimum 180px width (digital)</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-bold text-red-900 mb-3">✗ DON'T</h4>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Stretch or distort logo</li>
                        <li>• Rotate at angles</li>
                        <li>• Add effects or shadows</li>
                        <li>• Change colors arbitrarily</li>
                        <li>• Place on busy backgrounds</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* COLORS TAB */}
          <TabsContent value="colors">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Primary Colors</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="bg-[#2D3142] h-32 rounded-lg mb-3"></div>
                      <h4 className="font-bold">Deep Charcoal</h4>
                      <p className="text-sm text-gray-600 mb-2">#2D3142</p>
                      <p className="text-sm text-gray-600">RGB: 45, 49, 66</p>
                      <Badge className="mt-2">Primary Text</Badge>
                    </div>

                    <div>
                      <div className="bg-[#1F3A5F] h-32 rounded-lg mb-3"></div>
                      <h4 className="font-bold">Navy Blue</h4>
                      <p className="text-sm text-gray-600 mb-2">#1F3A5F</p>
                      <p className="text-sm text-gray-600">RGB: 31, 58, 95</p>
                      <Badge className="mt-2">CTAs & Links</Badge>
                    </div>

                    <div>
                      <div className="bg-white border-2 border-gray-300 h-32 rounded-lg mb-3"></div>
                      <h4 className="font-bold">Clean White</h4>
                      <p className="text-sm text-gray-600 mb-2">#FFFFFF</p>
                      <p className="text-sm text-gray-600">RGB: 255, 255, 255</p>
                      <Badge className="mt-2">Backgrounds</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Accent Colors</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="bg-[#C9A961] h-32 rounded-lg mb-3"></div>
                      <h4 className="font-bold">Soft Gold</h4>
                      <p className="text-sm text-gray-600 mb-2">#C9A961</p>
                      <p className="text-sm text-gray-600">RGB: 201, 169, 97</p>
                      <Badge className="mt-2">Premium Accents</Badge>
                      <p className="text-xs text-gray-500 mt-2">Use sparingly (max 5%)</p>
                    </div>

                    <div>
                      <div className="bg-[#F4F4F6] h-32 rounded-lg mb-3 border border-gray-300"></div>
                      <h4 className="font-bold">Light Stone Gray</h4>
                      <p className="text-sm text-gray-600 mb-2">#F4F4F6</p>
                      <p className="text-sm text-gray-600">RGB: 244, 244, 246</p>
                      <Badge className="mt-2">Section Backgrounds</Badge>
                    </div>

                    <div>
                      <div className="bg-[#A4B8A8] h-32 rounded-lg mb-3"></div>
                      <h4 className="font-bold">Sage Accent</h4>
                      <p className="text-sm text-gray-600 mb-2">#A4B8A8</p>
                      <p className="text-sm text-gray-600">RGB: 164, 184, 168</p>
                      <Badge className="mt-2">Optional Calming</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Color Usage Guidelines</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>Hero Sections:</strong> Navy to Charcoal gradient, White text, Gold CTAs</p>
                    <p><strong>Body Sections:</strong> Alternate White and Light Stone Gray backgrounds</p>
                    <p><strong>Buttons:</strong> Primary (Navy Blue), Secondary (Soft Gold), Tertiary (White outline)</p>
                    <p><strong>Trust Elements:</strong> Gold backgrounds for badges, Navy for certifications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TYPOGRAPHY TAB */}
          <TabsContent value="typography">
            <Card>
              <CardHeader>
                <CardTitle>Typography System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Font Families</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-2xl font-bold mb-2" style={{fontFamily: 'Montserrat'}}>Montserrat</h4>
                      <p className="text-sm text-gray-600 mb-4">Primary Font (Headings)</p>
                      <div className="space-y-2">
                        <p className="font-bold">Bold 700 — H1, H2, Major CTAs</p>
                        <p className="font-semibold">SemiBold 600 — H3, H4, Subheadings</p>
                        <p className="font-medium">Medium 500 — Badges, Labels</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-2xl mb-2" style={{fontFamily: 'Inter'}}>Inter</h4>
                      <p className="text-sm text-gray-600 mb-4">Secondary Font (Body)</p>
                      <div className="space-y-2">
                        <p className="font-semibold">SemiBold 600 — Bold emphasis</p>
                        <p>Regular 400 — Body text, paragraphs</p>
                        <p className="text-sm">Regular 400, 14px — Footer, captions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Type Scale</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <p className="text-5xl font-bold mb-1">Hero Headline</p>
                      <p className="text-sm text-gray-600">56px / Bold 700 / -1% tracking / Montserrat</p>
                    </div>

                    <div className="border-l-4 border-blue-600 pl-4">
                      <p className="text-4xl font-bold mb-1">Section Title</p>
                      <p className="text-sm text-gray-600">40px / Bold 700 / -0.5% tracking / Montserrat</p>
                    </div>

                    <div className="border-l-4 border-blue-600 pl-4">
                      <p className="text-2xl font-semibold mb-1">Component Heading</p>
                      <p className="text-sm text-gray-600">32px / SemiBold 600 / 0% tracking / Montserrat</p>
                    </div>

                    <div className="border-l-4 border-gray-400 pl-4">
                      <p className="text-base mb-1">Body Text — This is how standard paragraph text appears in the interface. Readable, clean, with proper line height.</p>
                      <p className="text-sm text-gray-600">16px / Regular 400 / 1.6 line-height / Inter</p>
                    </div>

                    <div className="border-l-4 border-gray-400 pl-4">
                      <p className="text-sm mb-1">Small Text — Footer, disclaimers, captions</p>
                      <p className="text-sm text-gray-600">14px / Regular 400 / 1.5 line-height / Inter</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Bilingual Typography</h3>
                  <div className="space-y-3">
                    <p className="text-gray-700"><strong>English:</strong> Standard weights, uppercase for buttons/labels</p>
                    <p className="text-gray-700"><strong>Spanish:</strong> Same sizing, avoid all-caps, sentence case for buttons, +0.1 line-height for accents</p>
                    <p className="text-gray-700"><strong>Required Characters:</strong> á, é, í, ó, ú, ñ, ü, ¿, ¡</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* VOICE TAB */}
          <TabsContent value="voice">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Voice & Tone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-3">We Are:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>✓ Knowledgeable guides</li>
                        <li>✓ Honest advisors</li>
                        <li>✓ Quality craftspeople</li>
                        <li>✓ Local renovation partners</li>
                        <li>✓ Bilingual communicators</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-3">We Are NOT:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>✗ High-pressure salespeople</li>
                        <li>✗ Generic contractors</li>
                        <li>✗ Budget-focused bargain hunters</li>
                        <li>✗ Impersonal corporations</li>
                        <li>✗ Over-the-top luxury brand</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3">Voice Characteristics</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Clear Communicator</p>
                        <p className="text-sm text-gray-600">Simple terms, transparent processes, accessible language</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Trustworthy Expert</p>
                        <p className="text-sm text-gray-600">Confident without arrogance, backed by credentials</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Warm Professional</p>
                        <p className="text-sm text-gray-600">Friendly but never casual, culturally sensitive</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Premium Without Pretension</p>
                        <p className="text-sm text-gray-600">Quality-focused, emphasizing value and craft</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tone Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-3 text-green-700">✓ Good Examples</h4>
                    <div className="space-y-3">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-1">Hero Headlines:</p>
                        <p className="text-gray-700">"Premium Home Renovations in Los Angeles"</p>
                        <p className="text-gray-700">"Transforming Los Angeles homes with 16+ years of expertise"</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-1">Service Copy:</p>
                        <p className="text-gray-700">"Our licensed team brings 16+ years of California construction experience to every kitchen renovation"</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-1">Financing:</p>
                        <p className="text-gray-700">"Start paying up to 60 days after project completion"</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3 text-red-700">✗ Avoid</h4>
                    <div className="space-y-3">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-gray-700 line-through">"We're the BEST renovators in California!"</p>
                        <p className="text-sm text-gray-600 mt-1">Too aggressive, unsubstantiated</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-gray-700 line-through">"Cheap remodeling that won't break the bank"</p>
                        <p className="text-sm text-gray-600 mt-1">Undermines premium positioning</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-gray-700 line-through">"No money down! Everyone approved!"</p>
                        <p className="text-sm text-gray-600 mt-1">Too salesy, not credible</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* IMAGERY TAB */}
          <TabsContent value="imagery">
            <Card>
              <CardHeader>
                <CardTitle>Imagery Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Photography Style</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-bold text-green-900 mb-3">✓ Use</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Modern Los Angeles homes (post-renovation)</li>
                        <li>• Clean, well-lit interiors</li>
                        <li>• Before/after comparisons</li>
                        <li>• Team on job sites (professional attire)</li>
                        <li>• Happy homeowners in renovated spaces</li>
                        <li>• Natural lighting, architectural focus</li>
                        <li>• Minimum 1920x1080px resolution</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg">
                      <h4 className="font-bold text-red-900 mb-3">✗ Avoid</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Stock photos of random construction</li>
                        <li>• Cartoon/illustrated contractor imagery</li>
                        <li>• Cheesy tool icons or hard hat clipart</li>
                        <li>• Overly staged or fake-looking scenes</li>
                        <li>• Low-quality smartphone snapshots</li>
                        <li>• Heavy filters or unrealistic editing</li>
                        <li>• Bright/neon colors</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Icon Usage</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="mb-4"><strong>Approved Icon Style:</strong> Simple line icons from Lucide React</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-blue-600 text-2xl">✓</span>
                        </div>
                        <p className="text-sm">Checkmarks</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-blue-600 text-2xl">🏠</span>
                        </div>
                        <p className="text-sm">House shapes</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-blue-600 text-2xl">🛡️</span>
                        </div>
                        <p className="text-sm">Shields</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-blue-600 text-2xl">⭐</span>
                        </div>
                        <p className="text-sm">Awards</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">Color: Navy Blue (#1F3A5F) or Soft Gold (#C9A961), 2px stroke weight</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* USAGE TAB */}
          <TabsContent value="usage">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button & CTA Design</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-4">Primary Buttons</h4>
                    <button className="bg-[#1F3A5F] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition">
                      Get Your Free Estimate
                    </button>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Background: Navy Blue (#1F3A5F)</p>
                      <p>Text: White, Montserrat SemiBold 600, 16px</p>
                      <p>Padding: 16px 32px, Border radius: 8px</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Secondary Buttons</h4>
                    <button className="bg-[#C9A961] text-[#2D3142] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition">
                      Talk to a Financing Specialist
                    </button>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Background: Soft Gold (#C9A961)</p>
                      <p>Text: Deep Charcoal (#2D3142), Montserrat SemiBold 600, 16px</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Outline Buttons</h4>
                    <button className="bg-transparent border-2 border-[#1F3A5F] text-[#1F3A5F] px-8 py-4 rounded-lg font-semibold hover:bg-[#1F3A5F] hover:text-white transition">
                      See Financing Options
                    </button>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Border: 2px Navy Blue (#1F3A5F)</p>
                      <p>Hover: Fill with Navy Blue, text becomes White</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Component Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-3">Trust Badge</h4>
                    <div className="inline-flex items-center gap-2 bg-[#C9A961] text-[#2D3142] px-6 py-3 rounded-full">
                      <span className="text-xl">🛡️</span>
                      <span className="font-semibold">Licensed & Insured · CSLB #1088270</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3">Service Card</h4>
                    <div className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition max-w-md">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-2xl">🏠</span>
                      </div>
                      <h5 className="text-xl font-bold text-[#1F3A5F] mb-2">Kitchen Remodeling</h5>
                      <p className="text-gray-700">Transform your kitchen with premium materials and expert craftsmanship</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ASSETS TAB */}
          <TabsContent value="assets">
            <Card>
              <CardHeader>
                <CardTitle>Brand Assets & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Phone:</strong> 310.460.9427</p>
                    <p><strong>WhatsApp:</strong> 310.460.9427</p>
                    <p><strong>Email:</strong> contact@homechoicerenovations.com</p>
                    <p><strong>License:</strong> CSLB #1088270</p>
                  </div>
                </div>

                <div className="bg-gray-900 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Email Signature Template</h3>
                  <div className="space-y-1 text-sm font-mono">
                    <p className="font-bold">[Name]</p>
                    <p>[Title]</p>
                    <p className="font-semibold mt-2">Home Choice Renovations — by Power Style</p>
                    <p className="mt-2">P: 310.460.9427</p>
                    <p>E: contact@homechoicerenovations.com</p>
                    <p>W: homechoicerenovations.com</p>
                    <p className="mt-2 text-yellow-400">Licensed & Insured | CSLB #1088270</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Social Media Specs</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold mb-2">Profile Image</p>
                      <p className="text-sm text-gray-600">1024x1024px</p>
                      <p className="text-sm text-gray-600">HCR monogram on Light Stone Gray</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold mb-2">Cover Photo</p>
                      <p className="text-sm text-gray-600">1200x628px (Facebook/LinkedIn)</p>
                      <p className="text-sm text-gray-600">Full logo on Navy Blue background</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold mb-2">Instagram Posts</p>
                      <p className="text-sm text-gray-600">1080x1080px</p>
                      <p className="text-sm text-gray-600">Before/after photos, minimal text</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold mb-2">Stories</p>
                      <p className="text-sm text-gray-600">1080x1920px</p>
                      <p className="text-sm text-gray-600">Navy background, centered content</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                  <p className="font-bold mb-2">⚠️ Important Note</p>
                  <p className="text-gray-700">
                    All brand assets and guidelines are proprietary. Maintain consistency across all touchpoints 
                    to build strong brand recognition and trust with Los Angeles homeowners.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2025 Home Choice Renovations — by Power Style</p>
          <p className="mt-1">Brand Identity Guidelines · Version 1.0</p>
        </div>
      </div>
    </div>
  );
}