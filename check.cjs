const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('docs/index.html','utf8');
assert(!/signin-with-chatgpt|cloud-sync\.js|fetch\(/.test(html));
const node=()=>({querySelectorAll(){return []},addEventListener(){},classList:{add(){},remove(){},toggle(){}},style:{},dataset:{},focus(){},scrollIntoView(){},setAttribute(){}}),nodes=new Map(),storage=new Map();
const sb={window:{},document:{body:node(),addEventListener(){},getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)},querySelectorAll(){return []},querySelector(){return null}},sessionStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout:()=>1,setInterval:()=>1,clearInterval(){},clearTimeout(){},confirm:()=>true,console};
vm.createContext(sb);
for(const match of html.matchAll(/<script src="([^"]+)"><\/script>/g))vm.runInContext(fs.readFileSync('docs/'+match[1],'utf8'),sb);
let script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]).join('\n');
script=script.replace('initRecords();\nstate.tab=\'exam\';\nrender();',`initRecords();state.tab='exam';window.test={state,renderExam,renderReview,renderComparison,renderProgress,nav};render();`);
vm.runInContext(script,sb);
for(const f of ['renderExam','renderReview','renderComparison','renderProgress'])assert(sb.window.test[f]().length>100,f);
assert.equal(sb.window.test.state.students.length,0);assert.equal(sb.window.test.state.sessions.length,0);
sb.window.test.nav('students');assert.equal(sb.window.test.state.tab,'exam');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const p=match[1];if(!p.includes(':')&&!p.includes('$')&&!p.includes('{'))assert(fs.existsSync('docs/'+p.replace(/^\//,'')),p)}
console.log('PASS: scripts parse, exam/review/compare/progress render, prep navigation blocked, students/sessions empty, assets exist, no auth/cloud requests.');
