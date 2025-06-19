import type { Author, Blogs as BlogsType } from '$lib/types/types';
import img1 from '$lib/images/certifications/aws.webp';

const author: Author = {
	name: 'Rajit Khosla',
	profilePicture: 'https://rk-personel-website-images.s3.eu-north-1.amazonaws.com/authorimage.png',
	href: '/',
	title: 'Senior Software Engineer'
};

export const Blogs: BlogsType = [
	{
		id: 'how-to-write-serverless-static-personnel-website',
		title: 'How to write serverless static personnal website using Sveltekit and Netlify',
		lead: 'Welcome to the behind-the-scenes look at how my personal static website is built!. In this post, I wlll walk you through the tech stack, UI toolkit, deployment setup, and share a simple architecture diagram that ties it all together.',
		author: { ...author },
		date: 'Jun. 16, 2025',
		isoDate: '2025-06-16',
		content: `
		  <div class="pt-7">
			
		
			<section class="mb-8">
			  <h2 class="text-3xl font-semibold  mb-4">🧱 Tech Stack Overview</h2>
			  <p class="text-lg ">My site is designed to be fast, scalable, and developer-friendly. Here's the core stack:</p>
			  <ul class="list-disc pl-6 mt-4 ">
				<li><strong>SvelteKit:</strong> A modern framework for building fast, interactive web apps.</li>
				<li><strong>TailwindCSS:</strong> A utility-first CSS framework for creating beautiful, responsive designs.</li>
				<li><strong>Flowbite & Flowbite Blocks:</strong> Ready-to-use UI components and layout blocks built on top of TailwindCSS.</li>
			  </ul>
			</section>
		
			<section class="mb-8">
			  <h2 class="text-3xl font-semibold  mb-4">🌐 Hosting & Deployment</h2>
			  <p class="text-lg ">The website is hosted on <a href="https://netlify.com" class="text-blue-600 hover:underline">Netlify</a> with:</p>
			  <ul class="list-disc pl-6 mt-4 ">
				<li>Static deployment for SvelteKit-generated pages.</li>
				<li>As soon as we commit to the github the netlfy build pipeline got triggered resulting in to deploying the new version of the application .</li>
				<li>We are using Netlify Functions for dynamic backend features (like contact API) which is hosted on serverless AWS Lambda.</li>
			  </ul>
			</section>
		
			<section class="mb-8">
			  <h2 class="text-3xl font-semibold  mb-4">🏗️ Architecture Diagram</h2>
			  <p class="text-lg ">Here's a simplified architecture diagram to give you a visual overview:</p>
			  <img src=\"https://rk-personel-website-images.s3.eu-north-1.amazonaws.com/Architecture-1.png\"alt="Architecture Diagram" class="w-full mt-4 transition-transform duration-300 ease-in-out hover:scale-150">
			</section>
		
			<section class="mb-8">
			  <h2 class="text-3xl font-semibold  mb-4">🛠️ Notable Features</h2>
			  <ul class="list-disc pl-6 mt-4 ">
				<li><strong>Responsive Design:</strong> Fully mobile-friendly UI using Tailwind breakpoints.</li>
				<li><strong>Dark Mode:</strong> Powered by Flowbite’s built-in theme toggler.</li>
				<li><strong>SEO Optimized:</strong> Meta tags via <code>svelte:head</code>.</li>
				<li><strong>Custom Components:</strong> Built reusable Svelte components for skills, cerificates,blogs and projects.</li>
			  </ul>
			</section>
		
			<section class="mb-8">
			<h2 class="text-3xl font-semibold mb-4">📦 Netlify Functions Example</h2>
			<p class="text-lg">
			  Here's a sample Netlify function I use to handle contact form submissions. The Netlify function is kind of a wrapper on the AWS Lambda, which is a serverless technology.
			</p>
			<pre class="bg-gray-800 text-white p-4 rounded mt-4 text-xs whitespace-pre-wrap break-words">
			  <code>
export async function handler(event) {
const { name, email, message } = JSON.parse(event.body);
// You can hook this to a DB or email API like SendGrid
return {
statusCode: 200,
body: JSON.stringify({ success: true, message: "Thanks for reaching out!" })
 };
}
		</code>
			  </pre>
			</section>
		
			<section class="mb-8">
			  <h2 class="text-3xl font-semibold  mb-4">📁 Project Structure</h2>
			  <pre class="bg-gray-800 text-white p-4 rounded mt-4 text-xs whitespace-pre-wrap break-words">
		<code class="pr-0">
├── src/
│   ├── routes/      # SvelteKit pages
│   ├── lib/         # Shared components
│   └── app.html     # HTML template
│── static/          # Static assets
│── netlify/functions/ # functions
│── tailwind.config.js
│── svelte.config.js
│── package.json
		</code>
			  </pre>
			</section>
		
			<section class="mb-8">
			  <h2 class="text-3xl font-semibold  mb-4">💡 Final Thoughts</h2>
			  <p class="text-lg ">By combining SvelteKit, TailwindCSS, Flowbite, and Netlify, I’ve created a fast, modern, and maintainable personal site with both static and dynamic capabilities.</p>
			  <p class="text-lg  mt-4">If you’re looking to build a performant personal website with a clean UI and minimal overhead, I highly recommend this stack!</p>
			  <p class="text-lg  mt-4">Feel free to <a href="mailto:rajit.khosla@gmail.com" class="text-blue-600 hover:underline">reach out</a> or <a href="https://github.com/rajitkhosla85/personnel-website" class="text-blue-600 hover:underline">check the source code</a> if you're curious!</p>
			</section>
		  </div>
		
		`
	}
];
