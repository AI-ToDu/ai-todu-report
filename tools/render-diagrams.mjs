import {readdir,mkdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
await mkdir(new URL('../design/diagrams/rendered/',import.meta.url),{recursive:true});
const args=process.env.MERMAID_CHROME_PATH?['-p','.puppeteer-local.json']:[];
if(args.length)await writeFile(new URL('../.puppeteer-local.json',import.meta.url),JSON.stringify({executablePath:process.env.MERMAID_CHROME_PATH,args:['--no-sandbox']}));
for(const file of (await readdir(new URL('../design/diagrams/',import.meta.url))).filter(x=>x.endsWith('.mmd'))){const result=spawnSync(process.execPath,['node_modules/@mermaid-js/mermaid-cli/src/cli.js','-i','design/diagrams/'+file,'-o','design/diagrams/rendered/'+file.replace('.mmd','.svg'),'-b','white','-c','design/mermaid-config.json','--size','1800','--no-font-embed',...args],{cwd:root,stdio:'inherit'});if(result.status!==0)process.exit(result.status??1);}
