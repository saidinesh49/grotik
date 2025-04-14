<script>
	import { seo } from '$lib';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import FeatureSection from '$lib/components/landing/FeatureSection.svelte';
	import HowItWorksSection from '$lib/components/landing/HowItWorksSection.svelte';
	import DemoSection from '$lib/components/landing/DemoSection.svelte';
	import CtaSection from '$lib/components/landing/CtaSection.svelte';
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />

	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content={seo.image} />
	<meta property="og:site_name" content={seo.title} />
	<meta property="og:url" content={seo.url} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={seo.image} />
	<meta name="twitter:site" content="@Sikandar_Bhide" />
</svelte:head>
<HeroSection />
<FeatureSection />
<HowItWorksSection />
<DemoSection />
<CtaSection />
