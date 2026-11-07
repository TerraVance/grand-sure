import { BackToTop } from "@/features/footer/BackToTop";
import { Footer } from "@/features/footer/Footer";
import { Navbar } from "@/features/navbar/Navbar";
import { QuoteProvider } from "@/features/quote/QuoteProvider";
import { getContent } from "@/content";

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = getContent();

  return (
    <QuoteProvider>
      <Navbar business={content.business} links={content.nav} quoteLabel={content.footer.quoteCta} />
      {children}
      <Footer business={content.business} links={content.nav} blurb={content.footer.blurb} />
      <BackToTop />
    </QuoteProvider>
  );
}
