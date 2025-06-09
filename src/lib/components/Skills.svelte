<script lang="ts">
	import Animate from './Animate.svelte';
	import { Card } from 'flowbite-svelte';
	//Common
	import Typescript from '~icons/devicon/typescript';

	//Frontend
	import Svelte from '~icons/devicon/svelte';
	import ReactWordmark from '~icons/devicon/react-wordmark';
	import Redux from '~icons/devicon/redux';
	import Tailwindcss from '~icons/devicon/tailwindcss';
	import Materialui from '~icons/devicon/materialui';
	import Css3 from '~icons/devicon/css3';
	import Html5 from '~icons/devicon/html5';
	import Javascript from '~icons/devicon/javascript';

	//backend
	import Nodejs from '~icons/devicon/nodejs';
	import Java from '~icons/devicon/java';
	import ExpressWordmark from '~icons/devicon/express-wordmark';
	import PythonWordmark from '~icons/devicon/python-wordmark';
	import NextjsWordmark from '~icons/devicon/nextjs-wordmark';

	//Cloud
	import AmazonwebservicesWordmark from '~icons/devicon/amazonwebservices-wordmark';
	import Azure from '~icons/devicon/azure';

	//Databses
	import MysqlWordmark from '~icons/devicon/mysql-wordmark';
	import Oracle from '~icons/devicon/oracle';
	import PostgresqlWordmark from '~icons/devicon/postgresql-wordmark';
	import Mongodb from '~icons/devicon/mongodb';
	import Dynamodb from '~icons/devicon/dynamodb';
	import Skill from './Skill.svelte';
</script>

<div class="item-stretch grid h-full w-full gap-7 sm:grid-cols-2">
	<Card
		class="flex h-full flex-col rounded-2xl border border-amber-500 p-4 transition-transform hover:scale-105 hover:shadow-lg sm:p-6 md:p-8"
	>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-amber-900 dark:text-white">Frontend</h5>
		<div class="grid grid-cols-3 gap-2 text-3xl sm:text-6xl">
			<Skill text="React" IconComponent={ReactWordmark} />
			<Skill text="Redux" IconComponent={Redux} />
			<Skill text="Svelte" IconComponent={Svelte} />
			<Skill text="Javascript" IconComponent={Javascript} />
			<Skill text="Typescript" IconComponent={Typescript} />
			<Skill text="Css3" IconComponent={Css3} />
			<Skill text="Material Ui" IconComponent={Materialui} />
			<Skill text="Tailwindcss" IconComponent={Tailwindcss} />
			<Skill text="Html5" IconComponent={Html5} />
		</div>
	</Card>

	<Card
		class="flex h-full flex-col rounded-2xl border border-amber-500 p-4 transition-transform hover:scale-105 hover:shadow-lg sm:p-6 md:p-8"
	>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-amber-900 dark:text-white">Backend</h5>
		<div class="grid grid-cols-3 gap-2 text-3xl sm:text-6xl">
			<Skill text="Nodejs" IconComponent={Nodejs} />
			<Skill text="Java" IconComponent={Java} />
			<Skill text="Python" IconComponent={PythonWordmark} />
			<Skill text="Typescript" IconComponent={Typescript} />
			<Skill text="Expressjs" IconComponent={ExpressWordmark} />
			<Skill text="Nextjs" IconComponent={NextjsWordmark} />
			<!-- svletekit-->
			<!-- koa -->
		</div>
	</Card>

	<Card
		class="flex h-full flex-col rounded-2xl border border-amber-500 p-4 transition-transform hover:scale-105 hover:shadow-lg sm:p-6 md:p-8"
	>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-amber-900 dark:text-white">Databases</h5>
		<div class="grid grid-cols-3 gap-2 text-3xl sm:text-6xl">
			<Skill text="Mysql" IconComponent={MysqlWordmark} />
			<Skill text="Oracle" IconComponent={Oracle} />
			<Skill text="Postgresql" IconComponent={PostgresqlWordmark} />
			<Skill text="Mongodb" IconComponent={Mongodb} />
			<Skill text="Dynamodb" IconComponent={Dynamodb} />
		</div>
	</Card>

	<Card
		class="flex h-full flex-col rounded-2xl border border-amber-500 p-4 transition-transform hover:scale-105 hover:shadow-lg sm:p-6 md:p-8"
	>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-amber-900 dark:text-white">Cloud</h5>
		<div class="grid grid-cols-3 gap-2 text-3xl sm:text-6xl">
			<Skill text="AWS" IconComponent={AmazonwebservicesWordmark} />
			<Skill text="Azure" IconComponent={Azure} />
		</div>
	</Card>
</div>

<style>
</style>
