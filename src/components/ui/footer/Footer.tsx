import React from "react";
import {
  Youtube,
  Facebook,
  Linkedin,
  Instagram,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-darkGold text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="relative w-32 h-32">
            <Image
              src="/logo.svg"
              alt="Company Logo"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>

          {/* Navigation Links */}
          <div className="col-span-2 space-y-4">
            <nav className="flex gap-3">
              <a href="#" className="hover:text-gray-200">
                DIVING RULES
              </a>
              <a href="#" className="hover:text-gray-200">
                ONBOARD PRICES
              </a>
              <a href="#" className="hover:text-gray-200">
                TRAVEL AGENT LIST
              </a>
              <a href="#" className="hover:text-gray-200">
                T&C
              </a>
              <a href="#" className="hover:text-gray-200">
                TOMPOTIKA DIVE LODGE
              </a>
            </nav>
            <div className="space-y-6">
                <div>
                <p className="mb-4 text-gray-300">Follow Us</p>
                <div className="flex space-x-4">
                    <a
                    href="#"
                    className="p-2 rounded-full border border-white hover:bg-white/10"
                    >
                    <Youtube size={20} />
                    </a>
                    <a
                    href="#"
                    className="p-2 rounded-full border border-white hover:bg-white/10"
                    >
                    <Facebook size={20} />
                    </a>
                    <a
                    href="#"
                    className="p-2 rounded-full border border-white hover:bg-white/10"
                    >
                    <Linkedin size={20} />
                    </a>
                    <a
                    href="#"
                    className="p-2 rounded-full border border-white hover:bg-white/10"
                    >
                    <Instagram size={20} />
                    </a>
                </div>
                </div>

                <div className="flex justify-between items-center border-t border-white/20 space-y-3">
                <div>
                    <a
                        href="tel:+6281246373025"
                        className="flex items-center space-x-2 hover:text-gray-200"
                    >
                        <Phone size={20} />
                        <span>+62 81246373025</span>
                    </a>
                    <a
                        href="mailto:info@wallacea-divecruise.com"
                        className="flex items-center space-x-2 hover:text-gray-200"
                    >
                        <Mail size={20} />
                        <span>info@wallacea-divecruise.com</span>
                    </a>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-300">Affiliated With</span>
                    <div className="relative w-32 h-32">
                        <Image
                        src={"https://s3-alpha-sig.figma.com/img/2ad2/d97d/0e34fcf08cba05a6b08139a59d3ed235?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XsxjIBb0eQAMLnMTFAlbKGEWqHts2lr~HQGP1~Kx9aFhyUtJeGvzpc2nB4PI~GTXog4VotpVF6DupmnV0dlcnd9qulv4KeqMxyH53sdoGke2bRkkRHEujXEiMQYc8PITI-EwY1fc20PTChCUZw9Dk7JWUa0kHqme8FoX5NIJ9o3eHf56IhTAtqyZwCbKUpGj~cU7jL0Kw7g1-7PWIvNTLITzQtBkd7fRG2JavRrzKIB6uXEvTO-GEcC3Gn0k4RTElSH4ciEbxbAyRd9tuOPdCrqoZ2TjT2cdruDAat0RGsdd470XMKYQU-dY-Tzlk4~x7fKuxa1tTpZFc6ylvknbuQ__"}
                        alt="affiliate"
                        fill 
                        className="object-contain brightness-0 invert"
                        />
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © 2024 Hello Indonesia. Web Design & Development by Kesato & Co.
            </p>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-300">
                The legal currency of trade in Indonesia is the Rupiah
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
