import { useState, useMemo } from 'react';
import { DollarSign, Plus, Trash2, X, Bell } from 'lucide-react';
const C='#f43f5e';
interface Sub { id:string; name:string; amount:number; cycle:'monthly'|'annual'; category:string; nextDate:string; color:string; }
const CATS=['Streaming','Software','Cloud','News','Fitness','Gaming','Other'];
const COLORS=['#f43f5e','#3b82f6','#10b981','#f59e0b','#8b5cf6','#06b6d4','#ec4899'];
const SK='sp_subs_v1';
const ld=():Sub[]=>{try{return JSON.parse(localStorage.getItem(SK)||'[]')}catch{return[]}};
export default function App() {
  const [subs,setSubs]=useState<Sub[]>(ld);
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({name:'',amount:'',cycle:'monthly' as 'monthly'|'annual',category:'Software',nextDate:'',color:C});
  const sv=(items:Sub[])=>{setSubs(items);localStorage.setItem(SK,JSON.stringify(items))};
  const inp={width:'100%',background:'#0a0408',border:`1px solid ${C}20`,borderRadius:'10px',padding:'10px 14px',color:'white',fontSize:'14px',outline:'none',fontFamily:'Inter'};
  const monthly=subs.reduce((a,s)=>a+(s.cycle==='monthly'?s.amount:s.amount/12),0);
  const annual=subs.reduce((a,s)=>a+(s.cycle==='annual'?s.amount:s.amount*12),0);
  const add=()=>{if(!form.name||!form.amount)return;sv([{id:crypto.randomUUID(),name:form.name,amount:+form.amount,cycle:form.cycle,category:form.category,nextDate:form.nextDate,color:form.color},...subs]);setShowAdd(false);setForm({name:'',amount:'',cycle:'monthly',category:'Software',nextDate:'',color:C});};
  return (<div style={{minHeight:'100vh',background:'#080408',display:'flex',flexDirection:'column'}}>
    <header style={{padding:'16px 20px',borderBottom:`1px solid ${C}20`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{width:'36px',height:'36px',borderRadius:'10px',background:`linear-gradient(135deg,${C},#e11d48)`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 14px ${C}30`}}><DollarSign size={16} color="white"/></div>
        <div><div style={{fontWeight:'700',fontSize:'16px',color:'white',lineHeight:1}}>Subscriptions Pro</div>
        <div style={{fontSize:'11px',color:`${C}60`,marginTop:'2px'}}>{subs.length} active</div></div>
      </div>
      <button onClick={()=>setShowAdd(true)} style={{display:'flex',alignItems:'center',gap:'5px',padding:'8px 14px',borderRadius:'9px',background:C,border:'none',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter'}}><Plus size={13}/> Add</button>
    </header>
    {subs.length>0&&<div style={{margin:'12px 20px',padding:'14px',background:`${C}10`,border:`1px solid ${C}20`,borderRadius:'12px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',textAlign:'center'}}>
      <div><div style={{fontSize:'22px',fontWeight:'700',color:C}}>${monthly.toFixed(2)}</div><div style={{fontSize:'11px',color:`${C}60`}}>Per month</div></div>
      <div><div style={{fontSize:'22px',fontWeight:'700',color:'#fda4af'}}>${annual.toFixed(0)}</div><div style={{fontSize:'11px',color:`${C}60`}}>Per year</div></div>
    </div>}
    <div style={{flex:1,overflow:'auto',padding:'0 20px 20px',display:'flex',flexDirection:'column',gap:'8px',marginTop:'12px'}}>
      {subs.length===0?(<div style={{textAlign:'center',padding:'60px 20px'}}>
        <div style={{fontSize:'52px',marginBottom:'16px'}}>💰</div>
        <h3 style={{fontSize:'20px',fontWeight:'700',color:'white',marginBottom:'8px'}}>Track subscriptions</h3>
        <p style={{color:`${C}60`,fontSize:'14px',lineHeight:'1.6',maxWidth:'240px',margin:'0 auto 24px'}}>Never forget what you're paying for each month.</p>
        <button onClick={()=>setShowAdd(true)} style={{padding:'12px 24px',borderRadius:'10px',background:C,border:'none',color:'white',fontSize:'14px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter'}}>Add first subscription</button>
      </div>):subs.map(s=>{
        const mo=s.cycle==='monthly'?s.amount:s.amount/12;
        return <div key={s.id} style={{background:`${s.color}08`,border:`1px solid ${s.color}25`,borderRadius:'12px',padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:s.color}}/>
              <span style={{color:'white',fontSize:'13px',fontWeight:'500'}}>{s.name}</span>
              <span style={{fontSize:'9px',padding:'2px 6px',borderRadius:'8px',background:`${s.color}20`,color:s.color}}>{s.category}</span>
            </div>
            <div style={{color:`${s.color}60`,fontSize:'11px'}}>{s.cycle} · {s.nextDate?'Next: '+s.nextDate:'No renewal date'}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'15px',fontWeight:'700',color:s.color}}>${s.amount}</div>
              <div style={{fontSize:'10px',color:`${s.color}60`}}>${mo.toFixed(2)}/mo</div>
            </div>
            <button onClick={()=>sv(subs.filter(x=>x.id!==s.id))} style={{padding:'4px',background:'none',border:'none',cursor:'pointer',color:`${C}40`}}><Trash2 size={12}/></button>
          </div>
        </div>;
      })}
    </div>
    {showAdd&&(<div style={{position:'fixed',inset:0,background:'#00000080',zIndex:50,display:'flex',alignItems:'flex-end'}} onClick={e=>e.target===e.currentTarget&&setShowAdd(false)}>
      <div style={{width:'100%',background:'#0a0408',borderRadius:'20px 20px 0 0',border:`1px solid ${C}20`,padding:'24px'}}>
        <div style={{width:'36px',height:'3px',background:'#140810',borderRadius:'2px',margin:'0 auto 20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'14px'}}>
          <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',fontFamily:'Inter'}}>Add Subscription</h3>
          <button onClick={()=>setShowAdd(false)} style={{background:'none',border:'none',cursor:'pointer',color:`${C}60`}}><X size={16}/></button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name (e.g. Netflix)" style={inp} autoFocus/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            <input type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="Amount ($)" style={inp}/>
            <select value={form.cycle} onChange={e=>setForm({...form,cycle:e.target.value as any})} style={{...inp,cursor:'pointer'}}>
              <option value="monthly">Monthly</option><option value="annual">Annual</option>
            </select>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
            {CATS.map(c=><button key={c} onClick={()=>setForm({...form,category:c})} style={{padding:'4px 10px',borderRadius:'20px',border:`1px solid ${form.category===c?C:C+'30'}`,background:form.category===c?`${C}15`:'transparent',color:form.category===c?C:`${C}60`,fontSize:'11px',cursor:'pointer',fontFamily:'Inter'}}>{c}</button>)}
          </div>
          <input type="date" value={form.nextDate} onChange={e=>setForm({...form,nextDate:e.target.value})} style={inp}/>
          <div style={{display:'flex',gap:'6px'}}>{COLORS.map(c=><button key={c} onClick={()=>setForm({...form,color:c})} style={{width:'28px',height:'28px',borderRadius:'50%',background:c,border:`2px solid ${form.color===c?'white':c+'60'}`,cursor:'pointer'}}/>)}</div>
          <button onClick={add} style={{padding:'14px',borderRadius:'12px',background:C,border:'none',color:'white',fontSize:'15px',fontWeight:'700',cursor:'pointer',fontFamily:'Inter'}}>Add Subscription</button>
        </div>
      </div>
    </div>)}
  </div>);
}