export const formulasData = [
  {
    category: "Mechanics",
    icon: "Cog",
    formulas: [
      {
        id: "projectile-motion", name: "Projectile Motion (Full)",
        description: "Complete projectile solver. Given any 3 of 5 variables, derives the other 2.",
        equation: "R = v²sin(2θ)/g,  H = v²sin²(θ)/(2g),  T = 2v·sin(θ)/g",
        variables: [
          { id: "R", label: "Range (R)", unit: "m" },
          { id: "H", label: "Max Height (H)", unit: "m" },
          { id: "T", label: "Flight Time (T)", unit: "s" },
          { id: "v", label: "Initial Velocity (v₀)", unit: "m/s" },
          { id: "theta", label: "Launch Angle (θ)", unit: "°" }
        ],
        calculate: (vals) => {
          const g = 9.81, toR = d => d * Math.PI / 180, toD = r => r * 180 / Math.PI;
          const { R, H, T, v, theta } = vals;
          const kn = [R,H,T,v,theta].filter(x=>x!==undefined).length;
          if (kn < 3) return { result: "Need at least 3 of 5 values.", steps: "Provide at least 3 variables." };
          const s = t => Math.sin(toR(t)), s2 = t => Math.sin(2*toR(t));
          if (v!==undefined && theta!==undefined) {
            if(v<0) return {result:"Error: v₀<0",steps:"Velocity must be ≥0."};
            const sv=s(theta),s2v=s2(theta);
            const cR=v*v*s2v/g, cH=v*v*sv*sv/(2*g), cT=2*v*sv/g;
            return {result:`R = ${cR.toFixed(4)} m | H = ${cH.toFixed(4)} m | T = ${cT.toFixed(4)} s`,steps:`sinθ=${sv.toFixed(4)}, sin2θ=${s2v.toFixed(4)}\nR = v²sin2θ/g = ${cR.toFixed(4)} m\nH = v²sin²θ/(2g) = ${cH.toFixed(4)} m\nT = 2v·sinθ/g = ${cT.toFixed(4)} s`};
          }
          if (R!==undefined && theta!==undefined) {
            const s2v=s2(theta); if(Math.abs(s2v)<1e-12) return {result:"Error: sin2θ≈0",steps:`θ=${theta}° is degenerate.`};
            const vSq=R*g/s2v; if(vSq<0) return {result:"Error: v₀²<0",steps:"Inconsistent R,θ."};
            const cV=Math.sqrt(vSq),sv=s(theta);
            return {result:`v₀ = ${cV.toFixed(4)} m/s | H = ${(cV*cV*sv*sv/(2*g)).toFixed(4)} m | T = ${(2*cV*sv/g).toFixed(4)} s`,steps:`v₀² = Rg/sin2θ = ${vSq.toFixed(4)} → v₀ = ${cV.toFixed(4)} m/s`};
          }
          if (H!==undefined && theta!==undefined) {
            const sv=s(theta); if(Math.abs(sv)<1e-12) return {result:"Error: sinθ≈0",steps:"Cannot solve at θ≈0°."};
            const vSq=2*g*H/(sv*sv); if(vSq<0) return {result:"Error: v₀²<0",steps:"Check inputs."};
            const cV=Math.sqrt(vSq),s2v=s2(theta);
            return {result:`v₀ = ${cV.toFixed(4)} m/s | R = ${(cV*cV*s2v/g).toFixed(4)} m | T = ${(2*cV*sv/g).toFixed(4)} s`,steps:`v₀² = 2gH/sin²θ = ${vSq.toFixed(4)}`};
          }
          if (T!==undefined && theta!==undefined) {
            const sv=s(theta); if(Math.abs(sv)<1e-12) return {result:"Error: sinθ≈0",steps:"Cannot solve at θ≈0°."};
            const cV=T*g/(2*sv); if(cV<0) return {result:"Error: v₀<0",steps:"Negative velocity."};
            const s2v=s2(theta);
            return {result:`v₀ = ${cV.toFixed(4)} m/s | R = ${(cV*cV*s2v/g).toFixed(4)} m | H = ${(cV*cV*sv*sv/(2*g)).toFixed(4)} m`,steps:`v₀ = Tg/(2sinθ) = ${cV.toFixed(4)} m/s`};
          }
          if (R!==undefined && v!==undefined) {
            if(v===0) return {result:"Error: v₀=0",steps:"Zero velocity."};
            const s2t=R*g/(v*v); if(Math.abs(s2t)>1) return {result:"Error: Unreachable range",steps:`sin2θ=${s2t.toFixed(4)}>1.`};
            const ang=toD(Math.asin(s2t))/2,sv=s(ang);
            return {result:`θ = ${ang.toFixed(4)}° | H = ${(v*v*sv*sv/(2*g)).toFixed(4)} m | T = ${(2*v*sv/g).toFixed(4)} s`,steps:`sin2θ = Rg/v² = ${s2t.toFixed(4)} → θ = ${ang.toFixed(4)}°`};
          }
          if (H!==undefined && v!==undefined) {
            if(v===0) return {result:"Error: v₀=0",steps:"Zero velocity."};
            const sSq=2*g*H/(v*v); if(sSq<0||sSq>1) return {result:"Error: Unreachable height",steps:`sin²θ=${sSq.toFixed(4)} outside [0,1].`};
            const ang=toD(Math.asin(Math.sqrt(sSq))),sv=s(ang),s2v=s2(ang);
            return {result:`θ = ${ang.toFixed(4)}° | R = ${(v*v*s2v/g).toFixed(4)} m | T = ${(2*v*sv/g).toFixed(4)} s`,steps:`sin²θ = 2gH/v² = ${sSq.toFixed(4)} → θ = ${ang.toFixed(4)}°`};
          }
          if (T!==undefined && v!==undefined) {
            if(v===0) return {result:"Error: v₀=0",steps:"Zero velocity."};
            const sv=T*g/(2*v); if(Math.abs(sv)>1) return {result:"Error: No real angle",steps:`sinθ=${sv.toFixed(4)}>1.`};
            const ang=toD(Math.asin(sv)),s2v=s2(ang);
            return {result:`θ = ${ang.toFixed(4)}° | R = ${(v*v*s2v/g).toFixed(4)} m | H = ${(v*v*sv*sv/(2*g)).toFixed(4)} m`,steps:`sinθ = Tg/(2v) = ${sv.toFixed(4)} → θ = ${ang.toFixed(4)}°`};
          }
          if (R!==undefined && H!==undefined) {
            if(R===0) return {result:"Error: R=0",steps:"Cannot determine angle."};
            const tanT=4*H/R, ang=toD(Math.atan(tanT));
            if(ang<=0||ang>=90) return {result:"Error: Bad angle",steps:`θ=${ang.toFixed(2)}° invalid.`};
            const sv=s(ang),vSq=2*g*H/(sv*sv); if(vSq<0) return {result:"Error: v₀²<0",steps:"Check inputs."};
            const cV=Math.sqrt(vSq);
            return {result:`v₀ = ${cV.toFixed(4)} m/s | θ = ${ang.toFixed(4)}° | T = ${(2*cV*sv/g).toFixed(4)} s`,steps:`tanθ = 4H/R = ${tanT.toFixed(4)} → θ = ${ang.toFixed(4)}°\nv₀ = ${cV.toFixed(4)} m/s`};
          }
          if (R!==undefined && T!==undefined) {
            if(T===0) return {result:"Error: T=0",steps:"Time cannot be zero."};
            const vx=R/T,vy=g*T/2,cV=Math.sqrt(vx*vx+vy*vy),ang=toD(Math.atan2(vy,vx)),cH=vy*vy/(2*g);
            return {result:`v₀ = ${cV.toFixed(4)} m/s | θ = ${ang.toFixed(4)}° | H = ${cH.toFixed(4)} m`,steps:`vₓ = R/T = ${vx.toFixed(4)}, vᵧ = gT/2 = ${vy.toFixed(4)}\nv₀ = ${cV.toFixed(4)}, θ = ${ang.toFixed(4)}°`};
          }
          return {result:"Insufficient data",steps:"H+T alone cannot determine all. Add R or v₀."};
        }
      },
      {
        id: "relativistic-energy", name: "Relativistic Energy-Momentum",
        description: "E²=(pc)²+(m₀c²)². Given any 2 of E,p,m₀,v — derives the rest plus γ and β.",
        equation: "E² = (pc)² + (m₀c²)²",
        variables: [
          { id: "E", label: "Total Energy (E)", unit: "J" },
          { id: "p", label: "Momentum (p)", unit: "kg·m/s" },
          { id: "m0", label: "Rest Mass (m₀)", unit: "kg" },
          { id: "v", label: "Velocity (v)", unit: "m/s" }
        ],
        calculate: (vals) => {
          const c=2.998e8; const {E,p,m0,v}=vals;
          const kn=[E,p,m0,v].filter(x=>x!==undefined).length;
          if(kn<2) return {result:"Need at least 2 values.",steps:"Provide at least 2 of 4."};
          if(m0!==undefined&&v!==undefined) {
            if(v<0) return {result:"Error: v<0",steps:"Velocity must be ≥0."};
            if(v>=c) return {result:"Error: v≥c",steps:`v≥c=${c.toExponential(4)}. Impossible.`};
            const gam=1/Math.sqrt(1-v*v/(c*c)),rE=m0*c*c,tE=gam*rE,mom=gam*m0*v;
            return {result:`E = ${tE.toExponential(4)} J | p = ${mom.toExponential(4)} kg·m/s | γ = ${gam.toFixed(6)}`,steps:`β = v/c = ${(v/c).toFixed(6)}\nγ = ${gam.toFixed(6)}\nE₀ = m₀c² = ${rE.toExponential(4)} J\nE = γm₀c² = ${tE.toExponential(4)} J\np = γm₀v = ${mom.toExponential(4)} kg·m/s`};
          }
          if(E!==undefined&&m0!==undefined) {
            const rE=m0*c*c; if(E<rE) return {result:"Error: E<m₀c²",steps:`E=${E.toExponential(4)} < m₀c²=${rE.toExponential(4)}.`};
            const pSq=E*E/(c*c)-m0*m0*c*c; if(pSq<0) return {result:"Error: p²<0",steps:"Inconsistency."};
            const mom=Math.sqrt(pSq),gam=E/rE,beta=Math.sqrt(1-1/(gam*gam));
            return {result:`p = ${mom.toExponential(4)} kg·m/s | v = ${(beta*c).toExponential(4)} m/s (${(beta*100).toFixed(2)}%c) | γ = ${gam.toFixed(6)}`,steps:`p = √(E²/c²−m₀²c²) = ${mom.toExponential(4)}\nβ = ${beta.toFixed(6)}`};
          }
          if(p!==undefined&&m0!==undefined) {
            const rE=m0*c*c,tE=Math.sqrt((p*c)*(p*c)+rE*rE),gam=tE/rE,beta=p*c/tE;
            return {result:`E = ${tE.toExponential(4)} J | v = ${(beta*c).toExponential(4)} m/s (${(beta*100).toFixed(2)}%c) | γ = ${gam.toFixed(6)}`,steps:`E = √((pc)²+(m₀c²)²) = ${tE.toExponential(4)} J`};
          }
          if(E!==undefined&&p!==undefined) {
            if(E<0) return {result:"Error: E<0",steps:"Energy must be positive."};
            const mSq=E*E-(p*c)*(p*c); if(mSq<0) return {result:"Error: Imaginary m₀",steps:"E²−(pc)²<0 → tachyonic."};
            const rM=Math.sqrt(mSq)/(c*c),beta=Math.abs(p)*c/E;
            if(beta>=1) return {result:"Error: β≥1",steps:"v≥c."};
            const gam=1/Math.sqrt(1-beta*beta);
            return {result:`m₀ = ${rM.toExponential(4)} kg | v = ${(beta*c).toExponential(4)} m/s (${(beta*100).toFixed(2)}%c) | γ = ${gam.toFixed(6)}`,steps:`m₀ = ${rM.toExponential(4)} kg\nβ = ${beta.toFixed(6)}`};
          }
          if(E!==undefined&&v!==undefined) {
            if(v>=c) return {result:"Error: v≥c",steps:"Cannot reach c."};
            const beta=v/c,gam=1/Math.sqrt(1-beta*beta),rE=E/gam,rM=rE/(c*c),mom=gam*rM*v;
            return {result:`m₀ = ${rM.toExponential(4)} kg | p = ${mom.toExponential(4)} kg·m/s | γ = ${gam.toFixed(6)}`,steps:`γ = ${gam.toFixed(6)}\nm₀ = ${rM.toExponential(4)} kg`};
          }
          if(p!==undefined&&v!==undefined) {
            if(v>=c) return {result:"Error: v≥c",steps:"Cannot reach c."};
            if(v<=0) return {result:"Error: v≤0",steps:"Need v>0."};
            const beta=v/c,gam=1/Math.sqrt(1-beta*beta),rM=p/(gam*v),tE=gam*rM*c*c;
            return {result:`E = ${tE.toExponential(4)} J | m₀ = ${rM.toExponential(4)} kg | γ = ${gam.toFixed(6)}`,steps:`m₀ = p/(γv) = ${rM.toExponential(4)} kg\nE = ${tE.toExponential(4)} J`};
          }
          return null;
        }
      },
      {
        id: "elastic-collision", name: "1D Elastic Collision",
        description: "Full elastic collision with conservation verification.",
        equation: "v₁f = [(m₁−m₂)v₁ᵢ + 2m₂v₂ᵢ] / (m₁+m₂)",
        variables: [
          { id: "m1", label: "Mass 1 (m₁)", unit: "kg" },
          { id: "m2", label: "Mass 2 (m₂)", unit: "kg" },
          { id: "v1i", label: "Initial Vel 1 (v₁ᵢ)", unit: "m/s" },
          { id: "v2i", label: "Initial Vel 2 (v₂ᵢ)", unit: "m/s" }
        ],
        calculate: (vals) => {
          const {m1,m2,v1i,v2i}=vals;
          if([m1,m2,v1i,v2i].some(x=>x===undefined)) return {result:"All 4 inputs required.",steps:"Need m₁, m₂, v₁ᵢ, v₂ᵢ."};
          if(m1<=0||m2<=0) return {result:"Error: Mass ≤ 0",steps:"Masses must be positive."};
          const M=m1+m2;
          const v1f=((m1-m2)*v1i+2*m2*v2i)/M;
          const v2f=((m2-m1)*v2i+2*m1*v1i)/M;
          const pB=m1*v1i+m2*v2i,pA=m1*v1f+m2*v2f;
          const keB=.5*m1*v1i*v1i+.5*m2*v2i*v2i,keA=.5*m1*v1f*v1f+.5*m2*v2f*v2f;
          const keOK=Math.abs(keB-keA)<1e-6?"✓ Conserved":"⚠ ΔKE="+Math.abs(keB-keA).toExponential(2);
          return {result:`v₁f = ${v1f.toFixed(4)} m/s | v₂f = ${v2f.toFixed(4)} m/s`,steps:`v₁f = [(${m1}−${m2})×${v1i} + 2×${m2}×${v2i}] / ${M} = ${v1f.toFixed(4)} m/s\nv₂f = [(${m2}−${m1})×${v2i} + 2×${m1}×${v1i}] / ${M} = ${v2f.toFixed(4)} m/s\n\nMomentum: ${pB.toFixed(4)} → ${pA.toFixed(4)} ✓\nKE: ${keB.toFixed(4)} → ${keA.toFixed(4)} ${keOK}`};
        }
      },
      {
        id: "shm", name: "Simple Harmonic Motion",
        description: "Full SHM: ω=√(k/m), T=2π/ω. Given any 2, derives all plus max v, a, KE.",
        equation: "ω = √(k/m),  T = 2π/ω,  x(t) = A·cos(ωt+φ)",
        variables: [
          { id: "A", label: "Amplitude (A)", unit: "m" },
          { id: "omega", label: "Angular Freq (ω)", unit: "rad/s" },
          { id: "T", label: "Period (T)", unit: "s" },
          { id: "f", label: "Frequency (f)", unit: "Hz" },
          { id: "k", label: "Spring Const (k)", unit: "N/m" },
          { id: "m", label: "Mass (m)", unit: "kg" }
        ],
        calculate: (vals) => {
          const {A,omega,T,f,k,m}=vals;
          const kn=[A,omega,T,f,k,m].filter(x=>x!==undefined).length;
          if(kn<2) return {result:"Need at least 2 values.",steps:"Provide at least 2."};
          let cW=omega,cT=T,cF=f,cK=k,cM=m,stp=[];
          if(cW===undefined){
            if(cT!==undefined){if(cT<=0)return{result:"Error: T≤0",steps:"Period >0."};cW=2*Math.PI/cT;stp.push(`ω = 2π/T = ${cW.toFixed(4)}`);}
            else if(cF!==undefined){if(cF<=0)return{result:"Error: f≤0",steps:"Frequency >0."};cW=2*Math.PI*cF;stp.push(`ω = 2πf = ${cW.toFixed(4)}`);}
            else if(cK!==undefined&&cM!==undefined){if(cM<=0||cK<=0)return{result:"Error: Invalid k/m",steps:"k,m >0."};cW=Math.sqrt(cK/cM);stp.push(`ω = √(k/m) = ${cW.toFixed(4)}`);}
          }
          if(cW===undefined) return {result:"Cannot derive ω",steps:"Need T, f, or (k,m)."};
          if(cT===undefined){cT=2*Math.PI/cW;stp.push(`T = 2π/ω = ${cT.toFixed(4)} s`);}
          if(cF===undefined){cF=cW/(2*Math.PI);stp.push(`f = ω/(2π) = ${cF.toFixed(4)} Hz`);}
          if(cK===undefined&&cM!==undefined){cK=cW*cW*cM;stp.push(`k = ω²m = ${cK.toFixed(4)} N/m`);}
          if(cM===undefined&&cK!==undefined){cM=cK/(cW*cW);stp.push(`m = k/ω² = ${cM.toFixed(4)} kg`);}
          let ex="";
          if(A!==undefined){
            ex=`\nMax v = Aω = ${(A*cW).toFixed(4)} m/s | Max a = Aω² = ${(A*cW*cW).toFixed(4)} m/s²`;
            if(cK) ex+=` | Max KE = ½kA² = ${(.5*cK*A*A).toFixed(4)} J`;
          }
          const parts=[];
          if(omega===undefined)parts.push(`ω = ${cW.toFixed(4)} rad/s`);
          if(T===undefined)parts.push(`T = ${cT.toFixed(4)} s`);
          if(f===undefined)parts.push(`f = ${cF.toFixed(4)} Hz`);
          if(k===undefined&&cK!==undefined)parts.push(`k = ${cK.toFixed(4)} N/m`);
          if(m===undefined&&cM!==undefined)parts.push(`m = ${cM.toFixed(4)} kg`);
          if(!parts.length) parts.push(`ω = ${cW.toFixed(4)}`,`T = ${cT.toFixed(4)}`,`f = ${cF.toFixed(4)}`);
          return {result:parts.join(" | ")+ex,steps:stp.join("\n")};
        }
      },
      {
        id: "newtons-second-law", name: "Newton's Second Law",
        description: "F=ma. Solves for Force, Mass, or Acceleration.",
        equation: "F = m × a",
        variables: [
          { id: "F", label: "Force (F)", unit: "N" },
          { id: "m", label: "Mass (m)", unit: "kg" },
          { id: "a", label: "Acceleration (a)", unit: "m/s²" }
        ],
        calculate: (vals) => {
          const {F,m,a}=vals;
          if(m!==undefined&&a!==undefined){if(m<0)return{result:"Error: m<0",steps:"Mass cannot be negative."};return{result:`F = ${(m*a).toFixed(4)} N`,steps:`F = ${m} × ${a} = ${(m*a).toFixed(4)} N`};}
          if(F!==undefined&&a!==undefined){if(a===0)return{result:"Error: a=0",steps:"Cannot find mass when a=0."};return{result:`m = ${(F/a).toFixed(4)} kg`,steps:`m = F/a = ${F}/${a} = ${(F/a).toFixed(4)} kg`};}
          if(F!==undefined&&m!==undefined){if(m===0)return{result:"Error: m=0",steps:"Cannot find a when m=0."};return{result:`a = ${(F/m).toFixed(4)} m/s²`,steps:`a = F/m = ${F}/${m} = ${(F/m).toFixed(4)} m/s²`};}
          return null;
        }
      },
      {
        id: "work-energy", name: "Work-Energy Theorem",
        description: "W=ΔKE=½mv₂²−½mv₁². Solves for Work, Mass, or either velocity.",
        equation: "W = ½mv₂² − ½mv₁²",
        variables: [
          { id: "W", label: "Net Work (W)", unit: "J" },
          { id: "m", label: "Mass (m)", unit: "kg" },
          { id: "v1", label: "Initial Vel (v₁)", unit: "m/s" },
          { id: "v2", label: "Final Vel (v₂)", unit: "m/s" }
        ],
        calculate: (vals) => {
          const {W,m,v1,v2}=vals;
          const kn=[W,m,v1,v2].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          if(m!==undefined&&v1!==undefined&&v2!==undefined){
            if(m<=0)return{result:"Error: m≤0",steps:"Mass must be >0."};
            const ke1=.5*m*v1*v1,ke2=.5*m*v2*v2,w=ke2-ke1;
            const dir=w>0?"speeding up":w<0?"slowing down":"no change";
            return{result:`W = ${w.toFixed(4)} J (${dir})`,steps:`KE₁ = ${ke1.toFixed(4)} J\nKE₂ = ${ke2.toFixed(4)} J\nW = ΔKE = ${w.toFixed(4)} J (${dir})`};
          }
          if(W!==undefined&&m!==undefined&&v1!==undefined){
            if(m<=0)return{result:"Error: m≤0",steps:"Mass must be >0."};
            const ke1=.5*m*v1*v1,ke2=ke1+W;if(ke2<0)return{result:"Error: KE₂<0",steps:"Work too negative."};
            const r=Math.sqrt(2*ke2/m);
            return{result:`v₂ = ${r.toFixed(4)} m/s`,steps:`KE₂ = ${ke2.toFixed(4)} J\nv₂ = √(2KE₂/m) = ${r.toFixed(4)} m/s`};
          }
          if(W!==undefined&&m!==undefined&&v2!==undefined){
            if(m<=0)return{result:"Error: m≤0",steps:"Mass must be >0."};
            const ke2=.5*m*v2*v2,ke1=ke2-W;if(ke1<0)return{result:"Error: KE₁<0",steps:"Check inputs."};
            const r=Math.sqrt(2*ke1/m);
            return{result:`v₁ = ${r.toFixed(4)} m/s`,steps:`KE₁ = ${ke1.toFixed(4)} J\nv₁ = √(2KE₁/m) = ${r.toFixed(4)} m/s`};
          }
          if(W!==undefined&&v1!==undefined&&v2!==undefined){
            const dv=v2*v2-v1*v1;if(dv===0)return{result:"Error: v₁²=v₂²",steps:"Cannot find mass."};
            const r=2*W/dv;if(r<=0)return{result:"Warning: m≤0",steps:`m = ${r.toFixed(4)}`};
            return{result:`m = ${r.toFixed(4)} kg`,steps:`m = 2W/(v₂²−v₁²) = ${r.toFixed(4)} kg`};
          }
          return null;
        }
      },
      {
        id: "gravitation", name: "Universal Gravitation",
        description: "F=Gm₁m₂/r². Solves for Force, either Mass, or Distance.",
        equation: "F = G × m₁ × m₂ / r²",
        variables: [
          { id: "F", label: "Force (F)", unit: "N" },
          { id: "m1", label: "Mass 1 (m₁)", unit: "kg" },
          { id: "m2", label: "Mass 2 (m₂)", unit: "kg" },
          { id: "r", label: "Distance (r)", unit: "m" }
        ],
        calculate: (vals) => {
          const G=6.674e-11;const {F,m1,m2,r}=vals;
          const kn=[F,m1,m2,r].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          if(m1!==undefined&&m2!==undefined&&r!==undefined){if(r<=0)return{result:"Error: r≤0",steps:"Distance >0."};const f=G*m1*m2/(r*r);return{result:`F = ${f.toExponential(4)} N`,steps:`F = Gm₁m₂/r² = ${f.toExponential(4)} N`};}
          if(F!==undefined&&m2!==undefined&&r!==undefined){if(r===0||m2===0)return{result:"Error: Division by 0",steps:"r, m₂ non-zero."};return{result:`m₁ = ${(F*r*r/(G*m2)).toExponential(4)} kg`,steps:`m₁ = Fr²/(Gm₂)`};}
          if(F!==undefined&&m1!==undefined&&r!==undefined){if(r===0||m1===0)return{result:"Error: Division by 0",steps:"r, m₁ non-zero."};return{result:`m₂ = ${(F*r*r/(G*m1)).toExponential(4)} kg`,steps:`m₂ = Fr²/(Gm₁)`};}
          if(F!==undefined&&m1!==undefined&&m2!==undefined){if(m1===0||m2===0)return{result:"Error: Division by 0",steps:"Masses non-zero."};const rs=G*m1*m2/F;if(rs<0)return{result:"Error: No real r",steps:"Negative under √."};return{result:`r = ${Math.sqrt(rs).toExponential(4)} m`,steps:`r = √(Gm₁m₂/F) = ${Math.sqrt(rs).toExponential(4)} m`};}
          return null;
        }
      }
    ]
  },
  {
    category: "Electricity & Magnetism",
    icon: "Zap",
    formulas: [
      {
        id: "rc-circuit", name: "RC Circuit (Charging)",
        description: "V(t)=V₀(1−e^(−t/RC)). Solves for voltage, R, C, time, or time constant.",
        equation: "V(t) = V₀(1 − e^(−t/RC)),  τ = RC",
        variables: [
          { id: "Vt", label: "Voltage at t (V(t))", unit: "V" },
          { id: "V0", label: "Source Voltage (V₀)", unit: "V" },
          { id: "R", label: "Resistance (R)", unit: "Ω" },
          { id: "C", label: "Capacitance (C)", unit: "F" },
          { id: "t", label: "Time (t)", unit: "s" }
        ],
        calculate: (vals) => {
          const {Vt,V0,R,C,t}=vals;
          const kn=[Vt,V0,R,C,t].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 5.",steps:"Provide at least 3."};
          if(V0!==undefined&&R!==undefined&&C!==undefined&&t!==undefined){
            if(R<=0||C<=0)return{result:"Error: R,C≤0",steps:"R,C >0."};if(t<0)return{result:"Error: t<0",steps:"Time ≥0."};
            const tau=R*C,cV=V0*(1-Math.exp(-t/tau)),pct=(cV/V0*100).toFixed(2);
            return{result:`V(${t}s) = ${cV.toFixed(6)} V (${pct}% charged)`,steps:`τ = RC = ${tau.toExponential(4)} s\ne^(−t/τ) = ${Math.exp(-t/tau).toExponential(4)}\nV(t) = ${cV.toFixed(6)} V`};
          }
          if(Vt!==undefined&&V0!==undefined&&R!==undefined&&C!==undefined){
            if(R<=0||C<=0)return{result:"Error: R,C≤0",steps:"R,C >0."};if(V0===0)return{result:"Error: V₀=0",steps:"Source is zero."};
            const ratio=Vt/V0;if(ratio>=1)return{result:"Error: V(t)≥V₀",steps:"Cannot reach source."};if(ratio<0)return{result:"Error: V(t)<0",steps:"Negative voltage."};
            const tau=R*C,cT=-tau*Math.log(1-ratio);
            return{result:`t = ${cT.toExponential(4)} s (${(cT/tau).toFixed(2)}τ)`,steps:`τ = ${tau.toExponential(4)} s\nt = −τ·ln(1−V/V₀) = ${cT.toExponential(4)} s`};
          }
          if(Vt!==undefined&&V0!==undefined&&t!==undefined){
            if(V0===0)return{result:"Error: V₀=0",steps:"Source is zero."};if(t<=0)return{result:"Error: t≤0",steps:"Time >0."};
            const ratio=Vt/V0;if(ratio>=1||ratio<0)return{result:"Error: Bad ratio",steps:`V/V₀ must be in [0,1).`};
            const tauN=t/(-Math.log(1-ratio));
            if(R!==undefined&&C===undefined){if(R<=0)return{result:"Error: R≤0",steps:"R >0."};return{result:`C = ${(tauN/R).toExponential(4)} F`,steps:`C = τ/R = ${(tauN/R).toExponential(4)} F`};}
            if(C!==undefined&&R===undefined){if(C<=0)return{result:"Error: C≤0",steps:"C >0."};return{result:`R = ${(tauN/C).toExponential(4)} Ω`,steps:`R = τ/C = ${(tauN/C).toExponential(4)} Ω`};}
          }
          if(R!==undefined&&C!==undefined&&t!==undefined&&Vt!==undefined){
            if(R<=0||C<=0||t<0)return{result:"Error: Invalid",steps:"R,C>0, t≥0."};
            const tau=R*C,ex=Math.exp(-t/tau),cV0=Vt/(1-ex);
            return{result:`V₀ = ${cV0.toFixed(6)} V`,steps:`V₀ = V(t)/(1−e^(−t/τ)) = ${cV0.toFixed(6)} V`};
          }
          return null;
        }
      },
      {
        id: "rlc-impedance", name: "RLC Series Impedance",
        description: "Z=√(R²+(XL−XC)²). Computes impedance, resonance, phase, Q-factor.",
        equation: "Z = √(R² + (ωL − 1/(ωC))²),  f₀ = 1/(2π√(LC))",
        variables: [
          { id: "R", label: "Resistance (R)", unit: "Ω" },
          { id: "L", label: "Inductance (L)", unit: "H" },
          { id: "C", label: "Capacitance (C)", unit: "F" },
          { id: "f", label: "Frequency (f)", unit: "Hz" },
          { id: "Z", label: "Impedance (Z)", unit: "Ω" }
        ],
        calculate: (vals) => {
          const {R,L,C,f,Z}=vals;
          const kn=[R,L,C,f,Z].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 5.",steps:"Provide at least 3."};
          if(R!==undefined&&L!==undefined&&C!==undefined&&f!==undefined){
            if(R<0||L<=0||C<=0||f<=0)return{result:"Error: Invalid",steps:"R≥0, L,C,f>0."};
            const w=2*Math.PI*f,XL=w*L,XC=1/(w*C);
            const cZ=Math.sqrt(R*R+(XL-XC)*(XL-XC));
            const phi=Math.atan2(XL-XC,R)*180/Math.PI;
            const f0=1/(2*Math.PI*Math.sqrt(L*C));
            const Q=1/R*Math.sqrt(L/C);
            const type=Math.abs(XL-XC)<.001?"RESONANCE":XL>XC?"Inductive":"Capacitive";
            return{result:`Z = ${cZ.toFixed(4)} Ω | φ = ${phi.toFixed(2)}° (${type}) | f₀ = ${f0.toFixed(4)} Hz | Q = ${Q.toFixed(4)}`,steps:`ω = ${w.toFixed(4)} rad/s\nXL = ${XL.toFixed(4)} Ω | XC = ${XC.toFixed(4)} Ω\nZ = ${cZ.toFixed(4)} Ω | φ = ${phi.toFixed(2)}°\nf₀ = ${f0.toFixed(4)} Hz | Q = ${Q.toFixed(4)}`};
          }
          if(Z!==undefined&&R!==undefined&&L!==undefined&&C!==undefined){
            if(Z<0||R<0||L<=0||C<=0)return{result:"Error: Invalid",steps:"Z,R≥0, L,C>0."};
            if(Z<R)return{result:"Error: Z<R",steps:`Z=${Z} < R=${R}.`};
            const dSq=Z*Z-R*R,d=Math.sqrt(dSq),res=[];
            for(const sign of[1,-1]){const b=-sign*d,disc=b*b+4*L/C;if(disc<0)continue;const w=(-b+Math.sqrt(disc))/(2*L);if(w>0)res.push(w);}
            if(!res.length)return{result:"Error: No real f",steps:"No positive frequency solution."};
            return{result:`f = ${res.map(w=>(w/(2*Math.PI)).toFixed(4)).join(" or ")} Hz`,steps:`Solving ω²L ∓ √(Z²−R²)·ω − 1/C = 0\n${res.map(w=>`f = ${(w/(2*Math.PI)).toFixed(4)} Hz`).join("\n")}`};
          }
          return null;
        }
      },
      {
        id: "ohms-law", name: "Ohm's Law",
        description: "V=IR. Solves for Voltage, Current, or Resistance.",
        equation: "V = I × R",
        variables: [
          { id: "V", label: "Voltage (V)", unit: "V" },
          { id: "I", label: "Current (I)", unit: "A" },
          { id: "R", label: "Resistance (R)", unit: "Ω" }
        ],
        calculate: (vals) => {
          const {V,I,R}=vals;
          if(I!==undefined&&R!==undefined) return{result:`V = ${(I*R).toFixed(4)} V`,steps:`V = ${I} × ${R} = ${(I*R).toFixed(4)} V`};
          if(V!==undefined&&R!==undefined){if(R===0)return{result:"Error: R=0",steps:"Short circuit."};return{result:`I = ${(V/R).toFixed(4)} A`,steps:`I = V/R = ${V}/${R} = ${(V/R).toFixed(4)} A`};}
          if(V!==undefined&&I!==undefined){if(I===0)return{result:"Error: I=0",steps:"Open circuit."};return{result:`R = ${(V/I).toFixed(4)} Ω`,steps:`R = V/I = ${V}/${I} = ${(V/I).toFixed(4)} Ω`};}
          return null;
        }
      },
      {
        id: "coulombs-law", name: "Coulomb's Law",
        description: "F=kq₁q₂/r². Solves for Force, Charge, or Distance.",
        equation: "F = k × q₁ × q₂ / r²",
        variables: [
          { id: "F", label: "Force (F)", unit: "N" },
          { id: "q1", label: "Charge 1 (q₁)", unit: "C" },
          { id: "q2", label: "Charge 2 (q₂)", unit: "C" },
          { id: "r", label: "Distance (r)", unit: "m" }
        ],
        calculate: (vals) => {
          const k=8.988e9;const {F,q1,q2,r}=vals;
          const kn=[F,q1,q2,r].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          if(q1!==undefined&&q2!==undefined&&r!==undefined){if(r===0)return{result:"Error: r=0",steps:"Distance >0."};const f=k*q1*q2/(r*r);const n=f>0?"Repulsive":f<0?"Attractive":"Zero";return{result:`F = ${f.toExponential(4)} N (${n})`,steps:`F = kq₁q₂/r² = ${f.toExponential(4)} N (${n})`};}
          if(F!==undefined&&q2!==undefined&&r!==undefined){if(r===0)return{result:"Error: r=0",steps:"r >0."};return{result:`q₁ = ${(F*r*r/(k*q2)).toExponential(4)} C`,steps:`q₁ = Fr²/(kq₂)`};}
          if(F!==undefined&&q1!==undefined&&r!==undefined){if(r===0)return{result:"Error: r=0",steps:"r >0."};return{result:`q₂ = ${(F*r*r/(k*q1)).toExponential(4)} C`,steps:`q₂ = Fr²/(kq₁)`};}
          if(F!==undefined&&q1!==undefined&&q2!==undefined){if(q1===0||q2===0)return{result:"Error: q=0",steps:"Charges non-zero."};const rs=k*q1*q2/F;if(rs<0)return{result:"Error: No real r",steps:"Negative under √."};return{result:`r = ${Math.sqrt(rs).toExponential(4)} m`,steps:`r = √(kq₁q₂/F) = ${Math.sqrt(rs).toExponential(4)} m`};}
          return null;
        }
      },
      {
        id: "capacitor-energy", name: "Capacitor Energy & Storage",
        description: "E=½CV²=½QV=Q²/(2C). Solves for Energy, Capacitance, Voltage, or Charge.",
        equation: "E = ½CV² = ½QV = Q²/(2C)",
        variables: [
          { id: "E", label: "Energy (E)", unit: "J" },
          { id: "C", label: "Capacitance (C)", unit: "F" },
          { id: "V", label: "Voltage (V)", unit: "V" },
          { id: "Q", label: "Charge (Q)", unit: "C" }
        ],
        calculate: (vals) => {
          const {E,C,V,Q}=vals;
          const kn=[E,C,V,Q].filter(x=>x!==undefined).length;
          if(kn<2) return {result:"Need at least 2 of 4.",steps:"Provide at least 2."};
          if(C!==undefined&&V!==undefined){return{result:`E = ${(.5*C*V*V).toExponential(4)} J | Q = ${(C*V).toExponential(4)} C`,steps:`E = ½CV² = ${(.5*C*V*V).toExponential(4)} J\nQ = CV = ${(C*V).toExponential(4)} C`};}
          if(E!==undefined&&V!==undefined){if(V===0)return{result:"Error: V=0",steps:"Cannot find C."};const c=2*E/(V*V);return{result:`C = ${c.toExponential(4)} F | Q = ${(c*V).toExponential(4)} C`,steps:`C = 2E/V² = ${c.toExponential(4)} F`};}
          if(E!==undefined&&C!==undefined){if(C===0)return{result:"Error: C=0",steps:"Cannot find V."};const vSq=2*E/C;if(vSq<0)return{result:"Error: V²<0",steps:"Check inputs."};const v=Math.sqrt(vSq);return{result:`V = ${v.toExponential(4)} V | Q = ${(C*v).toExponential(4)} C`,steps:`V = √(2E/C) = ${v.toExponential(4)} V`};}
          if(Q!==undefined&&V!==undefined){if(V===0)return{result:"Error: V=0",steps:"Cannot find C."};const c=Q/V;return{result:`C = ${c.toExponential(4)} F | E = ${(.5*Q*V).toExponential(4)} J`,steps:`C = Q/V | E = ½QV`};}
          if(Q!==undefined&&C!==undefined){if(C===0)return{result:"Error: C=0",steps:"Cannot find V."};const v=Q/C;return{result:`V = ${v.toExponential(4)} V | E = ${(Q*Q/(2*C)).toExponential(4)} J`,steps:`V = Q/C | E = Q²/(2C)`};}
          if(E!==undefined&&Q!==undefined){if(Q===0)return{result:"Error: Q=0",steps:"Cannot solve."};return{result:`C = ${(Q*Q/(2*E)).toExponential(4)} F | V = ${(2*E/Q).toExponential(4)} V`,steps:`C = Q²/(2E) | V = 2E/Q`};}
          return null;
        }
      },
      {
        id: "biot-savart", name: "Magnetic Field (Long Wire)",
        description: "B=μ₀I/(2πr). Solves for B-field, Current, or Distance.",
        equation: "B = μ₀I / (2πr)",
        variables: [
          { id: "B", label: "Magnetic Field (B)", unit: "T" },
          { id: "I", label: "Current (I)", unit: "A" },
          { id: "r", label: "Distance (r)", unit: "m" }
        ],
        calculate: (vals) => {
          const mu=4*Math.PI*1e-7;const {B,I,r}=vals;
          if(I!==undefined&&r!==undefined){if(r<=0)return{result:"Error: r≤0",steps:"Distance >0."};return{result:`B = ${(mu*I/(2*Math.PI*r)).toExponential(4)} T`,steps:`B = μ₀I/(2πr) = ${(mu*I/(2*Math.PI*r)).toExponential(4)} T`};}
          if(B!==undefined&&r!==undefined){if(r<=0)return{result:"Error: r≤0",steps:"Distance >0."};return{result:`I = ${(B*2*Math.PI*r/mu).toFixed(4)} A`,steps:`I = B·2πr/μ₀ = ${(B*2*Math.PI*r/mu).toFixed(4)} A`};}
          if(B!==undefined&&I!==undefined){if(I===0)return{result:"Error: I=0",steps:"No field from zero current."};const rv=mu*I/(2*Math.PI*B);return{result:`r = ${rv.toExponential(4)} m`,steps:`r = μ₀I/(2πB) = ${rv.toExponential(4)} m`};}
          return null;
        }
      }
    ]
  },
  {
    category: "Thermodynamics",
    icon: "Thermometer",
    formulas: [
      {
        id: "ideal-gas", name: "Ideal Gas Law",
        description: "PV=nRT. Solves for Pressure, Volume, Moles, or Temperature with unit conversions.",
        equation: "P × V = n × R × T",
        variables: [
          { id: "P", label: "Pressure (P)", unit: "Pa" },
          { id: "V", label: "Volume (V)", unit: "m³" },
          { id: "n", label: "Moles (n)", unit: "mol" },
          { id: "T", label: "Temperature (T)", unit: "K" }
        ],
        calculate: (vals) => {
          const R=8.314;const {P,V,n,T}=vals;
          const kn=[P,V,n,T].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          if(P!==undefined&&V!==undefined&&n!==undefined){if(n<=0||V<=0)return{result:"Error: n,V≤0",steps:"Must be >0."};const t=P*V/(n*R);return{result:`T = ${t.toFixed(4)} K (${(t-273.15).toFixed(2)} °C)`,steps:`T = PV/(nR) = ${t.toFixed(4)} K`};}
          if(P!==undefined&&V!==undefined&&T!==undefined){if(T<=0||V<=0)return{result:"Error: T,V≤0",steps:"Must be >0."};const nm=P*V/(R*T);return{result:`n = ${nm.toFixed(4)} mol (${(nm*22.414).toFixed(4)} L at STP)`,steps:`n = PV/(RT) = ${nm.toFixed(4)} mol`};}
          if(P!==undefined&&n!==undefined&&T!==undefined){if(n<=0||T<=0)return{result:"Error: n,T≤0",steps:"Must be >0."};const v=n*R*T/P;return{result:`V = ${v.toExponential(4)} m³`,steps:`V = nRT/P = ${v.toExponential(4)} m³`};}
          if(V!==undefined&&n!==undefined&&T!==undefined){if(n<=0||T<=0||V<=0)return{result:"Error: Invalid",steps:"V,n,T >0."};const p=n*R*T/V;return{result:`P = ${p.toExponential(4)} Pa (${(p/101325).toFixed(4)} atm)`,steps:`P = nRT/V = ${p.toExponential(4)} Pa = ${(p/101325).toFixed(4)} atm`};}
          return null;
        }
      },
      {
        id: "heat-transfer", name: "Heat Transfer (Specific Heat)",
        description: "Q=mcΔT. Solves for Heat, Mass, Specific Heat, or ΔT.",
        equation: "Q = m × c × ΔT",
        variables: [
          { id: "Q", label: "Heat (Q)", unit: "J" },
          { id: "m", label: "Mass (m)", unit: "kg" },
          { id: "c", label: "Specific Heat (c)", unit: "J/(kg·K)" },
          { id: "dT", label: "Temp Change (ΔT)", unit: "K" }
        ],
        calculate: (vals) => {
          const {Q,m,c,dT}=vals;
          const kn=[Q,m,c,dT].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          if(m!==undefined&&c!==undefined&&dT!==undefined) return{result:`Q = ${(m*c*dT).toFixed(4)} J`,steps:`Q = ${m} × ${c} × ${dT} = ${(m*c*dT).toFixed(4)} J`};
          if(Q!==undefined&&c!==undefined&&dT!==undefined){if(c*dT===0)return{result:"Error: c·ΔT=0",steps:"Cannot find mass."};return{result:`m = ${(Q/(c*dT)).toFixed(4)} kg`,steps:`m = Q/(cΔT) = ${(Q/(c*dT)).toFixed(4)} kg`};}
          if(Q!==undefined&&m!==undefined&&dT!==undefined){if(m*dT===0)return{result:"Error: m·ΔT=0",steps:"Cannot find c."};return{result:`c = ${(Q/(m*dT)).toFixed(4)} J/(kg·K)`,steps:`c = Q/(mΔT) = ${(Q/(m*dT)).toFixed(4)} J/(kg·K)`};}
          if(Q!==undefined&&m!==undefined&&c!==undefined){if(m*c===0)return{result:"Error: m·c=0",steps:"Cannot find ΔT."};return{result:`ΔT = ${(Q/(m*c)).toFixed(4)} K`,steps:`ΔT = Q/(mc) = ${(Q/(m*c)).toFixed(4)} K`};}
          return null;
        }
      },
      {
        id: "carnot", name: "Carnot Efficiency",
        description: "η=1−Tc/Th. Solves for Efficiency, Hot or Cold reservoir temperature.",
        equation: "η = 1 − T_cold / T_hot",
        variables: [
          { id: "eta", label: "Efficiency (η)", unit: "" },
          { id: "Tc", label: "Cold Temp (Tc)", unit: "K" },
          { id: "Th", label: "Hot Temp (Th)", unit: "K" }
        ],
        calculate: (vals) => {
          const {eta,Tc,Th}=vals;
          if(Tc!==undefined&&Th!==undefined){if(Th===0)return{result:"Error: Th=0",steps:"Hot temp >0K."};if(Tc<0||Th<0)return{result:"Error: T<0",steps:"Temps ≥0K."};if(Tc>Th)return{result:"Error: Tc>Th",steps:"Cold < Hot."};const e=1-Tc/Th;return{result:`η = ${(e*100).toFixed(2)}%`,steps:`η = 1 − ${Tc}/${Th} = ${(e*100).toFixed(2)}%`};}
          if(eta!==undefined&&Th!==undefined){if(Th===0)return{result:"Error: Th=0",steps:"Hot temp >0K."};const tc=Th*(1-eta);return{result:`Tc = ${tc.toFixed(4)} K`,steps:`Tc = Th(1−η) = ${tc.toFixed(4)} K`};}
          if(eta!==undefined&&Tc!==undefined){const d=1-eta;if(d<=0)return{result:"Error: η≥1",steps:"η=1 → Th→∞."};const th=Tc/d;return{result:`Th = ${th.toFixed(4)} K`,steps:`Th = Tc/(1−η) = ${th.toFixed(4)} K`};}
          return null;
        }
      },
      {
        id: "stefan-boltzmann", name: "Stefan-Boltzmann Radiation",
        description: "P=εσAT⁴. Solves for radiated power, emissivity, area, or temperature.",
        equation: "P = ε × σ × A × T⁴",
        variables: [
          { id: "P", label: "Power (P)", unit: "W" },
          { id: "e", label: "Emissivity (ε)", unit: "" },
          { id: "A", label: "Area (A)", unit: "m²" },
          { id: "T", label: "Temperature (T)", unit: "K" }
        ],
        calculate: (vals) => {
          const sig=5.67e-8;const {P,e,A,T}=vals;
          const kn=[P,e,A,T].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          if(e!==undefined&&A!==undefined&&T!==undefined){if(A<=0||T<0||e<0||e>1)return{result:"Error: Invalid",steps:"A>0, T≥0, ε∈[0,1]."};const p=e*sig*A*Math.pow(T,4);return{result:`P = ${p.toExponential(4)} W`,steps:`P = εσAT⁴ = ${p.toExponential(4)} W`};}
          if(P!==undefined&&A!==undefined&&T!==undefined){if(A<=0||T<=0)return{result:"Error: Invalid",steps:"A,T >0."};const em=P/(sig*A*Math.pow(T,4));return{result:`ε = ${em.toFixed(4)}`,steps:`ε = P/(σAT⁴) = ${em.toFixed(4)}`};}
          if(P!==undefined&&e!==undefined&&T!==undefined){if(e<=0||T<=0)return{result:"Error: Invalid",steps:"ε,T >0."};const a=P/(e*sig*Math.pow(T,4));return{result:`A = ${a.toExponential(4)} m²`,steps:`A = P/(εσT⁴) = ${a.toExponential(4)} m²`};}
          if(P!==undefined&&e!==undefined&&A!==undefined){if(e<=0||A<=0)return{result:"Error: Invalid",steps:"ε,A >0."};const t4=P/(e*sig*A);if(t4<0)return{result:"Error: T⁴<0",steps:"Check inputs."};return{result:`T = ${Math.pow(t4,.25).toFixed(4)} K`,steps:`T⁴ = P/(εσA) → T = ${Math.pow(t4,.25).toFixed(4)} K`};}
          return null;
        }
      }
    ]
  },
  {
    category: "Waves & Optics",
    icon: "Waves",
    formulas: [
      {
        id: "wave-speed", name: "Wave Equation",
        description: "v=fλ. Solves for wave speed, frequency, or wavelength.",
        equation: "v = f × λ",
        variables: [
          { id: "v", label: "Wave Speed (v)", unit: "m/s" },
          { id: "f", label: "Frequency (f)", unit: "Hz" },
          { id: "lambda", label: "Wavelength (λ)", unit: "m" }
        ],
        calculate: (vals) => {
          const {v,f,lambda}=vals;
          if(f!==undefined&&lambda!==undefined) return{result:`v = ${(f*lambda).toFixed(4)} m/s`,steps:`v = fλ = ${f} × ${lambda} = ${(f*lambda).toFixed(4)} m/s`};
          if(v!==undefined&&lambda!==undefined){if(lambda===0)return{result:"Error: λ=0",steps:"Wavelength >0."};return{result:`f = ${(v/lambda).toFixed(4)} Hz`,steps:`f = v/λ = ${v}/${lambda} = ${(v/lambda).toFixed(4)} Hz`};}
          if(v!==undefined&&f!==undefined){if(f===0)return{result:"Error: f=0",steps:"Frequency >0."};return{result:`λ = ${(v/f).toFixed(4)} m`,steps:`λ = v/f = ${v}/${f} = ${(v/f).toFixed(4)} m`};}
          return null;
        }
      },
      {
        id: "doppler-effect", name: "Doppler Effect",
        description: "f'=f(v+v₀)/(v−vₛ). Full Doppler solver for moving source and observer.",
        equation: "f' = f × (v + v_observer) / (v − v_source)",
        variables: [
          { id: "fp", label: "Observed Freq (f')", unit: "Hz" },
          { id: "f", label: "Source Freq (f)", unit: "Hz" },
          { id: "vw", label: "Wave Speed (v)", unit: "m/s" },
          { id: "vo", label: "Observer Speed (v₀)", unit: "m/s" },
          { id: "vs", label: "Source Speed (vₛ)", unit: "m/s" }
        ],
        calculate: (vals) => {
          const {fp,f,vw,vo,vs}=vals;
          const kn=[fp,f,vw,vo,vs].filter(x=>x!==undefined).length;
          if(kn<4) return {result:"Need at least 4 of 5.",steps:"Provide at least 4."};
          if(f!==undefined&&vw!==undefined&&vo!==undefined&&vs!==undefined){
            if(vw-vs===0) return{result:"Error: Sonic boom",steps:"v−vₛ=0 (Mach 1)."};
            const obs=f*(vw+vo)/(vw-vs);return{result:`f' = ${obs.toFixed(4)} Hz`,steps:`f' = f(v+v₀)/(v−vₛ) = ${f}×(${vw}+${vo})/(${vw}−${vs}) = ${obs.toFixed(4)} Hz`};
          }
          if(fp!==undefined&&vw!==undefined&&vo!==undefined&&vs!==undefined){
            if(vw-vs===0)return{result:"Error: v−vₛ=0",steps:"Sonic boom."};
            const ratio=(vw+vo)/(vw-vs);if(ratio===0)return{result:"Error: ratio=0",steps:"Cannot find f."};
            const src=fp/ratio;return{result:`f = ${src.toFixed(4)} Hz`,steps:`f = f'×(v−vₛ)/(v+v₀) = ${src.toFixed(4)} Hz`};
          }
          if(fp!==undefined&&f!==undefined&&vo!==undefined&&vs!==undefined){
            const d=fp-f;if(d===0)return{result:"Error: f'=f",steps:"v is indeterminate."};
            const w=(f*vo+fp*vs)/d;return{result:`v = ${w.toFixed(4)} m/s`,steps:`v = (f×v₀+f'×vₛ)/(f'−f) = ${w.toFixed(4)} m/s`};
          }
          if(fp!==undefined&&f!==undefined&&vw!==undefined&&vs!==undefined){
            if(vw-vs===0)return{result:"Error: v−vₛ=0",steps:"Division by zero."};
            const o=(fp*(vw-vs)/f)-vw;return{result:`v₀ = ${o.toFixed(4)} m/s`,steps:`v₀ = (f'×(v−vₛ)/f)−v = ${o.toFixed(4)} m/s`};
          }
          if(fp!==undefined&&f!==undefined&&vw!==undefined&&vo!==undefined){
            if(fp===0)return{result:"Error: f'=0",steps:"Cannot solve."};
            const s=(fp*vw-f*vw-f*vo)/fp;return{result:`vₛ = ${s.toFixed(4)} m/s`,steps:`vₛ = (f'v−fv−fv₀)/f' = ${s.toFixed(4)} m/s`};
          }
          return null;
        }
      },
      {
        id: "lens-equation", name: "Thin Lens Equation",
        description: "1/f=1/dₒ+1/dᵢ. Solves for focal length, object distance, or image distance with magnification.",
        equation: "1/f = 1/dₒ + 1/dᵢ",
        variables: [
          { id: "f", label: "Focal Length (f)", unit: "m" },
          { id: "do", label: "Object Distance (dₒ)", unit: "m" },
          { id: "di", label: "Image Distance (dᵢ)", unit: "m" }
        ],
        calculate: (vals) => {
          const {f,do: dObj,di}=vals;
          if(dObj!==undefined&&di!==undefined){if(dObj===0||di===0)return{result:"Error: d=0",steps:"Distances >0."};const fl=(dObj*di)/(dObj+di);const mag=-di/dObj;const imgType=di>0?"Real":"Virtual";const orient=mag>0?"Upright":"Inverted";return{result:`f = ${fl.toFixed(4)} m | M = ${mag.toFixed(4)} (${imgType}, ${orient})`,steps:`1/f = 1/${dObj} + 1/${di}\nf = ${fl.toFixed(4)} m\nM = −dᵢ/dₒ = ${mag.toFixed(4)} (${imgType}, ${orient})`};}
          if(f!==undefined&&di!==undefined){if(f===0||di===0)return{result:"Error: f or dᵢ=0",steps:"Must be >0."};const d=(f*di)/(di-f);return{result:`dₒ = ${d.toFixed(4)} m`,steps:`dₒ = f·dᵢ/(dᵢ−f) = ${d.toFixed(4)} m`};}
          if(f!==undefined&&dObj!==undefined){if(f===0||dObj===0)return{result:"Error: f or dₒ=0",steps:"Must be >0."};const d=(f*dObj)/(dObj-f);return{result:`dᵢ = ${d.toFixed(4)} m`,steps:`dᵢ = f·dₒ/(dₒ−f) = ${d.toFixed(4)} m`};}
          return null;
        }
      },
      {
        id: "snells-law", name: "Snell's Law (Refraction)",
        description: "n₁sinθ₁=n₂sinθ₂. Solves for refractive indices or angles. Detects total internal reflection.",
        equation: "n₁ × sin(θ₁) = n₂ × sin(θ₂)",
        variables: [
          { id: "n1", label: "Index 1 (n₁)", unit: "" },
          { id: "theta1", label: "Angle 1 (θ₁)", unit: "°" },
          { id: "n2", label: "Index 2 (n₂)", unit: "" },
          { id: "theta2", label: "Angle 2 (θ₂)", unit: "°" }
        ],
        calculate: (vals) => {
          const toR=d=>d*Math.PI/180, toD=r=>r*180/Math.PI;
          const {n1,theta1,n2,theta2}=vals;
          const kn=[n1,theta1,n2,theta2].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          if(n1!==undefined&&theta1!==undefined&&n2!==undefined){
            const s2=n1*Math.sin(toR(theta1))/n2;if(Math.abs(s2)>1)return{result:"Error: Total Internal Reflection",steps:`sinθ₂=${s2.toFixed(4)}>1. TIR occurs.`};
            return{result:`θ₂ = ${toD(Math.asin(s2)).toFixed(4)}°`,steps:`sinθ₂ = n₁sinθ₁/n₂ = ${s2.toFixed(4)} → θ₂ = ${toD(Math.asin(s2)).toFixed(4)}°`};
          }
          if(n1!==undefined&&theta1!==undefined&&theta2!==undefined){
            const s2=Math.sin(toR(theta2)),s1=Math.sin(toR(theta1));if(s1===0)return{result:"Error: sinθ₁=0",steps:"Cannot find n₂."};
            return{result:`n₂ = ${(n1*s1/s2).toFixed(4)}`,steps:`n₂ = n₁sinθ₁/sinθ₂ = ${(n1*s1/s2).toFixed(4)}`};
          }
          if(n2!==undefined&&theta1!==undefined&&theta2!==undefined){
            const s2=Math.sin(toR(theta2)),s1=Math.sin(toR(theta1));if(s2===0)return{result:"Error: sinθ₂=0",steps:"Cannot find n₁."};
            return{result:`n₁ = ${(n2*s2/s1).toFixed(4)}`,steps:`n₁ = n₂sinθ₂/sinθ₁ = ${(n2*s2/s1).toFixed(4)}`};
          }
          if(n1!==undefined&&n2!==undefined&&theta2!==undefined){
            const s1=n2*Math.sin(toR(theta2))/n1;if(Math.abs(s1)>1)return{result:"Error: No real θ₁",steps:`sinθ₁=${s1.toFixed(4)}>1.`};
            return{result:`θ₁ = ${toD(Math.asin(s1)).toFixed(4)}°`,steps:`θ₁ = ${toD(Math.asin(s1)).toFixed(4)}°`};
          }
          return null;
        }
      },
      {
        id: "photoelectric", name: "Photoelectric Effect",
        description: "KE=hf−φ. Solves for KE, frequency, work function, or wavelength. Detects if emission occurs.",
        equation: "KE = hf − φ = hc/λ − φ",
        variables: [
          { id: "KE", label: "Kinetic Energy (KE)", unit: "eV" },
          { id: "f", label: "Frequency (f)", unit: "Hz" },
          { id: "phi", label: "Work Function (φ)", unit: "eV" },
          { id: "lambda", label: "Wavelength (λ)", unit: "nm" }
        ],
        calculate: (vals) => {
          const h=6.626e-34, c=3e8, eV=1.602e-19;
          const {KE,f,phi,lambda}=vals;
          const kn=[KE,f,phi,lambda].filter(x=>x!==undefined).length;
          if(kn<2) return {result:"Need at least 2 of 4.",steps:"Provide at least 2."};
          let cF=f,cL=lambda,cPhi=phi,cKE=KE;
          if(cF===undefined&&cL!==undefined){cF=c/(cL*1e-9);}
          if(cL===undefined&&cF!==undefined){cL=c/cF*1e9;}
          if(cF===undefined) return {result:"Need frequency or wavelength.",steps:"Provide f or λ."};
          const photonE=(h*cF)/eV;
          if(KE!==undefined&&phi!==undefined){
            const expectedKE=photonE-phi;
            if(expectedKE<0) return{result:`No emission. Photon energy (${photonE.toFixed(4)} eV) < Work function (${phi} eV).`,steps:`hf = ${photonE.toFixed(4)} eV\nhf < φ → No photoelectric emission.`};
            return{result:`Consistent. Photon E = ${photonE.toFixed(4)} eV, KE = ${expectedKE.toFixed(4)} eV`,steps:`hf = ${photonE.toFixed(4)} eV\nKE = hf − φ = ${expectedKE.toFixed(4)} eV`};
          }
          if(KE!==undefined&&f===undefined&&lambda===undefined){
            if(phi===undefined) return {result:"Need φ",steps:"Provide work function."};
            const needed=KE+phi;if(needed<=0)return{result:"Error: Negative energy",steps:"Check inputs."};
            const freq=needed*eV/h;
            return{result:`f = ${freq.toExponential(4)} Hz | λ = ${(c/freq*1e9).toFixed(4)} nm`,steps:`hf = KE+φ = ${needed.toFixed(4)} eV\nf = ${freq.toExponential(4)} Hz`};
          }
          if(phi===undefined&&KE!==undefined){
            cPhi=photonE-KE;
            if(cPhi<0) return{result:"Error: φ<0",steps:`Work function = ${cPhi.toFixed(4)} eV < 0. Check inputs.`};
            const threshF=cPhi*eV/h;
            return{result:`φ = ${cPhi.toFixed(4)} eV | Threshold f = ${threshF.toExponential(4)} Hz | Threshold λ = ${(c/threshF*1e9).toFixed(2)} nm`,steps:`φ = hf − KE = ${cPhi.toFixed(4)} eV\nThreshold: f₀ = ${threshF.toExponential(4)} Hz`};
          }
          if(cKE===undefined&&phi!==undefined){
            cKE=photonE-phi;
            if(cKE<0) return{result:`No emission. Photon E (${photonE.toFixed(4)} eV) < φ (${phi} eV). Need λ < ${(c/(phi*eV/h)*1e9).toFixed(2)} nm.`,steps:`hf = ${photonE.toFixed(4)} eV < φ = ${phi} eV`};
            const vMax=Math.sqrt(2*cKE*eV/9.109e-31);
            return{result:`KE = ${cKE.toFixed(4)} eV | v_max = ${vMax.toExponential(4)} m/s`,steps:`KE = hf − φ = ${cKE.toFixed(4)} eV\nv_max = √(2KE/mₑ) = ${vMax.toExponential(4)} m/s`};
          }
          return null;
        }
      }
    ]
  },
  {
    category: "Modern Physics",
    icon: "Atom",
    formulas: [
      {
        id: "de-broglie", name: "de Broglie Wavelength",
        description: "λ=h/p=h/(mv). Solves for wavelength, momentum, mass, or velocity.",
        equation: "λ = h / (m × v)",
        variables: [
          { id: "lambda", label: "Wavelength (λ)", unit: "m" },
          { id: "m", label: "Mass (m)", unit: "kg" },
          { id: "v", label: "Velocity (v)", unit: "m/s" }
        ],
        calculate: (vals) => {
          const h=6.626e-34;const {lambda,m,v}=vals;
          if(m!==undefined&&v!==undefined){if(m<=0||v<=0)return{result:"Error: m,v≤0",steps:"Mass and velocity must be >0."};const l=h/(m*v);return{result:`λ = ${l.toExponential(4)} m`,steps:`λ = h/(mv) = ${h.toExponential(4)}/(${m}×${v}) = ${l.toExponential(4)} m`};}
          if(lambda!==undefined&&v!==undefined){if(v<=0)return{result:"Error: v≤0",steps:"Velocity >0."};const mass=h/(lambda*v);return{result:`m = ${mass.toExponential(4)} kg`,steps:`m = h/(λv) = ${mass.toExponential(4)} kg`};}
          if(lambda!==undefined&&m!==undefined){if(m<=0)return{result:"Error: m≤0",steps:"Mass >0."};const vel=h/(lambda*m);return{result:`v = ${vel.toExponential(4)} m/s`,steps:`v = h/(λm) = ${vel.toExponential(4)} m/s`};}
          return null;
        }
      },
      {
        id: "compton", name: "Compton Scattering",
        description: "Δλ=(h/mc)(1−cosθ). Solves for wavelength shift, scattering angle, or incident/scattered wavelength.",
        equation: "Δλ = (h/mₑc)(1 − cosθ)",
        variables: [
          { id: "dL", label: "Wavelength Shift (Δλ)", unit: "pm" },
          { id: "theta", label: "Scatter Angle (θ)", unit: "°" }
        ],
        calculate: (vals) => {
          const h=6.626e-34,me=9.109e-31,c=3e8;
          const comptonW=h/(me*c)*1e12;
          const {dL,theta}=vals;
          const toR=d=>d*Math.PI/180,toD=r=>r*180/Math.PI;
          if(dL!==undefined&&theta!==undefined){
            const expected=comptonW*(1-Math.cos(toR(theta)));
            return{result:`Expected Δλ = ${expected.toFixed(4)} pm | Compton wavelength = ${comptonW.toFixed(4)} pm`,steps:`Δλ = (h/mc)(1−cos${theta}°) = ${comptonW.toFixed(4)}×(1−${Math.cos(toR(theta)).toFixed(4)}) = ${expected.toFixed(4)} pm`};
          }
          if(theta!==undefined&&dL===undefined){
            const shift=comptonW*(1-Math.cos(toR(theta)));
            return{result:`Δλ = ${shift.toFixed(4)} pm`,steps:`Δλ = ${comptonW.toFixed(4)}×(1−cos${theta}°) = ${shift.toFixed(4)} pm`};
          }
          if(dL!==undefined&&theta===undefined){
            const ratio=dL/comptonW;
            if(ratio<0||ratio>2) return{result:"Error: Invalid Δλ",steps:`Δλ/${comptonW.toFixed(4)} = ${ratio.toFixed(4)} outside [0,2].`};
            const ang=toD(Math.acos(1-ratio));
            return{result:`θ = ${ang.toFixed(4)}°`,steps:`cosθ = 1 − Δλ/(h/mc) = ${ratio.toFixed(4)} → θ = ${ang.toFixed(4)}°`};
          }
          return null;
        }
      },
      {
        id: "einstein-mass-energy", name: "Mass-Energy Equivalence",
        description: "E=mc². Solves for Energy or Mass.",
        equation: "E = m × c²",
        variables: [
          { id: "E", label: "Energy (E)", unit: "J" },
          { id: "m", label: "Mass (m)", unit: "kg" }
        ],
        calculate: (vals) => {
          const c=3e8;const {E,m}=vals;
          if(m!==undefined){if(m<0)return{result:"Error: m<0",steps:"Mass must be ≥0."};const e=m*c*c;return{result:`E = ${e.toExponential(4)} J (${(e/1.602e-13).toExponential(4)} MeV)`,steps:`E = mc² = ${m}×(3×10⁸)² = ${e.toExponential(4)} J`};}
          if(E!==undefined){if(E<0)return{result:"Error: E<0",steps:"Energy must be ≥0."};const mass=E/(c*c);return{result:`m = ${mass.toExponential(4)} kg`,steps:`m = E/c² = ${mass.toExponential(4)} kg`};}
          return null;
        }
      },
      {
        id: "radioactive-decay", name: "Radioactive Decay",
        description: "N=N₀e^(−λt). Solves for remaining nuclei, half-life, time, or decay constant.",
        equation: "N = N₀ × e^(−λt),  t½ = ln2/λ",
        variables: [
          { id: "N", label: "Remaining (N)", unit: "" },
          { id: "N0", label: "Initial (N₀)", unit: "" },
          { id: "halfLife", label: "Half-life (t½)", unit: "s" },
          { id: "t", label: "Time (t)", unit: "s" }
        ],
        calculate: (vals) => {
          const {N,N0,halfLife,t}=vals;
          const kn=[N,N0,halfLife,t].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          const lam=halfLife!==undefined?Math.log(2)/halfLife:undefined;
          if(N0!==undefined&&halfLife!==undefined&&t!==undefined){
            if(N0<=0||halfLife<=0||t<0)return{result:"Error: Invalid",steps:"N₀,t½>0, t≥0."};
            const cN=N0*Math.exp(-lam*t);const pct=(cN/N0*100).toFixed(2);
            return{result:`N = ${cN.toExponential(4)} (${pct}% remaining)`,steps:`λ = ln2/t½ = ${lam.toExponential(4)} /s\nN = N₀e^(−λt) = ${cN.toExponential(4)} (${pct}% left)`};
          }
          if(N!==undefined&&N0!==undefined&&halfLife!==undefined){
            if(N<=0||N0<=0||halfLife<=0)return{result:"Error: Invalid",steps:"N,N₀,t½ >0."};
            if(N>N0)return{result:"Error: N>N₀",steps:"Cannot have more than initial."};
            const cT=-Math.log(N/N0)/lam;
            return{result:`t = ${cT.toExponential(4)} s (${(cT/halfLife).toFixed(2)} half-lives)`,steps:`t = −ln(N/N₀)/λ = ${cT.toExponential(4)} s`};
          }
          if(N!==undefined&&N0!==undefined&&t!==undefined){
            if(N<=0||N0<=0||t<0)return{result:"Error: Invalid",steps:"N,N₀>0, t≥0."};
            if(N>N0)return{result:"Error: N>N₀",steps:"Check inputs."};
            const cLam=-Math.log(N/N0)/t;const cHL=Math.log(2)/cLam;
            return{result:`t½ = ${cHL.toExponential(4)} s | λ = ${cLam.toExponential(4)} /s`,steps:`λ = −ln(N/N₀)/t = ${cLam.toExponential(4)} /s\nt½ = ln2/λ = ${cHL.toExponential(4)} s`};
          }
          if(N!==undefined&&halfLife!==undefined&&t!==undefined){
            if(halfLife<=0||t<0)return{result:"Error: Invalid",steps:"t½>0, t≥0."};
            const cN0=N/Math.exp(-lam*t);
            return{result:`N₀ = ${cN0.toExponential(4)}`,steps:`N₀ = N/e^(−λt) = ${cN0.toExponential(4)}`};
          }
          return null;
        }
      },
      {
        id: "heisenberg", name: "Heisenberg Uncertainty",
        description: "ΔxΔp ≥ ℏ/2. Given one uncertainty, computes the minimum of the other.",
        equation: "Δx × Δp ≥ ℏ/2",
        variables: [
          { id: "dx", label: "Position Uncertainty (Δx)", unit: "m" },
          { id: "dp", label: "Momentum Uncertainty (Δp)", unit: "kg·m/s" }
        ],
        calculate: (vals) => {
          const hbar=1.055e-34;const {dx,dp}=vals;
          if(dx!==undefined&&dp===undefined){
            if(dx<=0)return{result:"Error: Δx≤0",steps:"Uncertainty must be >0."};
            const minDP=hbar/(2*dx);
            return{result:`Δp ≥ ${minDP.toExponential(4)} kg·m/s`,steps:`Δp ≥ ℏ/(2Δx) = ${minDP.toExponential(4)} kg·m/s`};
          }
          if(dp!==undefined&&dx===undefined){
            if(dp<=0)return{result:"Error: Δp≤0",steps:"Uncertainty must be >0."};
            const minDX=hbar/(2*dp);
            return{result:`Δx ≥ ${minDX.toExponential(4)} m`,steps:`Δx ≥ ℏ/(2Δp) = ${minDX.toExponential(4)} m`};
          }
          if(dx!==undefined&&dp!==undefined){
            const product=dx*dp;const limit=hbar/2;
            const ok=product>=limit;
            return{result:`ΔxΔp = ${product.toExponential(4)} ${ok?"≥":"<"} ℏ/2 = ${limit.toExponential(4)} → ${ok?"✓ Allowed":"⚠ Violates uncertainty principle"}`,steps:`Product = ${product.toExponential(4)}\nℏ/2 = ${limit.toExponential(4)}\n${ok?"Consistent":"VIOLATION"}`};
          }
          return null;
        }
      }
    ]
  },
  {
    category: "Mathematics",
    icon: "Calculator",
    formulas: [
      {
        id: "quadratic", name: "Quadratic Formula",
        description: "ax²+bx+c=0. Finds roots including complex roots with full discriminant analysis.",
        equation: "x = [−b ± √(b²−4ac)] / 2a",
        variables: [
          { id: "a", label: "Coefficient a", unit: "" },
          { id: "b", label: "Coefficient b", unit: "" },
          { id: "c", label: "Constant c", unit: "" }
        ],
        calculate: (vals) => {
          const {a,b,c}=vals;
          if(a===undefined||b===undefined||c===undefined) return {result:"All 3 required.",steps:"Need a, b, c."};
          if(a===0) return{result:"Error: a=0",steps:"Not quadratic (a=0). Use linear equation."};
          const disc=b*b-4*a*c;
          if(disc<0){
            const real=(-b/(2*a)).toFixed(4),imag=(Math.sqrt(-disc)/(2*a)).toFixed(4);
            return{result:`x = ${real} ± ${Math.abs(imag)}i`,steps:`Discriminant = ${disc.toFixed(4)} < 0 → Complex roots\nx = ${real} ± ${Math.abs(imag)}i`};
          }
          if(disc===0){const r=(-b/(2*a)).toFixed(4);return{result:`x = ${r} (repeated root)`,steps:`Discriminant = 0 → Repeated root\nx = ${r}`};}
          const r1=(-b+Math.sqrt(disc))/(2*a),r2=(-b-Math.sqrt(disc))/(2*a);
          return{result:`x₁ = ${r1.toFixed(4)}, x₂ = ${r2.toFixed(4)}`,steps:`Disc = ${disc.toFixed(4)} > 0 → Two real roots\nx₁ = ${r1.toFixed(4)}\nx₂ = ${r2.toFixed(4)}`};
        }
      },
      {
        id: "pythagorean", name: "Pythagorean Theorem",
        description: "a²+b²=c². Solves for any side of a right triangle.",
        equation: "a² + b² = c²",
        variables: [
          { id: "a", label: "Side a", unit: "" },
          { id: "b", label: "Side b", unit: "" },
          { id: "c", label: "Hypotenuse c", unit: "" }
        ],
        calculate: (vals) => {
          const {a,b,c}=vals;
          if(a!==undefined&&b!==undefined){if(a<0||b<0)return{result:"Error: Negative side",steps:"Sides must be ≥0."};return{result:`c = ${Math.sqrt(a*a+b*b).toFixed(4)}`,steps:`c = √(${a}²+${b}²) = ${Math.sqrt(a*a+b*b).toFixed(4)}`};}
          if(a!==undefined&&c!==undefined){if(c<=a)return{result:"Error: c≤a",steps:"Hypotenuse must be > leg."};return{result:`b = ${Math.sqrt(c*c-a*a).toFixed(4)}`,steps:`b = √(${c}²−${a}²) = ${Math.sqrt(c*c-a*a).toFixed(4)}`};}
          if(b!==undefined&&c!==undefined){if(c<=b)return{result:"Error: c≤b",steps:"Hypotenuse must be > leg."};return{result:`a = ${Math.sqrt(c*c-b*b).toFixed(4)}`,steps:`a = √(${c}²−${b}²) = ${Math.sqrt(c*c-b*b).toFixed(4)}`};}
          return null;
        }
      },
      {
        id: "distance-2d", name: "2D Distance Formula",
        description: "d=√((x₂−x₁)²+(y₂−y₁)²). Solves for distance or any coordinate.",
        equation: "d = √((x₂−x₁)² + (y₂−y₁)²)",
        variables: [
          { id: "d", label: "Distance (d)", unit: "" },
          { id: "x1", label: "x₁", unit: "" },
          { id: "y1", label: "y₁", unit: "" },
          { id: "x2", label: "x₂", unit: "" },
          { id: "y2", label: "y₂", unit: "" }
        ],
        calculate: (vals) => {
          const {d,x1,y1,x2,y2}=vals;
          if(d===undefined&&x1!==undefined&&y1!==undefined&&x2!==undefined&&y2!==undefined){
            const dist=Math.sqrt((x2-x1)**2+(y2-y1)**2);
            return{result:`d = ${dist.toFixed(4)}`,steps:`d = √((${x2}−${x1})²+(${y2}−${y1})²) = ${dist.toFixed(4)}`};
          }
          if(d!==undefined&&x1!==undefined&&y1!==undefined&&x2!==undefined){
            const dySq=d*d-(x2-x1)**2;if(dySq<0)return{result:"Error: No real y₂",steps:"Distance too short for given x-values."};
            const y2a=y1+Math.sqrt(dySq),y2b=y1-Math.sqrt(dySq);
            return{result:`y₂ = ${y2a.toFixed(4)} or ${y2b.toFixed(4)}`,steps:`(y₂−y₁)² = d²−(x₂−x₁)² = ${dySq.toFixed(4)}`};
          }
          if(d!==undefined&&x1!==undefined&&y1!==undefined&&y2!==undefined){
            const dxSq=d*d-(y2-y1)**2;if(dxSq<0)return{result:"Error: No real x₂",steps:"Distance too short."};
            const x2a=x1+Math.sqrt(dxSq),x2b=x1-Math.sqrt(dxSq);
            return{result:`x₂ = ${x2a.toFixed(4)} or ${x2b.toFixed(4)}`,steps:`(x₂−x₁)² = d²−(y₂−y₁)² = ${dxSq.toFixed(4)}`};
          }
          return {result:"Need at least 4 of 5 values.",steps:"Provide distance + all coords except one, or all coords."};
        }
      },
      {
        id: "law-of-cosines", name: "Law of Cosines",
        description: "c²=a²+b²−2ab·cosC. Solves for any side or angle in any triangle.",
        equation: "c² = a² + b² − 2ab·cos(C)",
        variables: [
          { id: "a", label: "Side a", unit: "" },
          { id: "b", label: "Side b", unit: "" },
          { id: "c", label: "Side c", unit: "" },
          { id: "C", label: "Angle C", unit: "°" }
        ],
        calculate: (vals) => {
          const toR=d=>d*Math.PI/180,toD=r=>r*180/Math.PI;
          const {a,b,c,C}=vals;
          const kn=[a,b,c,C].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need at least 3 of 4.",steps:"Provide at least 3."};
          if(a!==undefined&&b!==undefined&&C!==undefined){
            if(a<=0||b<=0)return{result:"Error: a,b≤0",steps:"Sides >0."};
            const side=Math.sqrt(a*a+b*b-2*a*b*Math.cos(toR(C)));
            return{result:`c = ${side.toFixed(4)}`,steps:`c² = ${a}²+${b}²−2×${a}×${b}×cos(${C}°) = ${side.toFixed(4)}`};
          }
          if(a!==undefined&&b!==undefined&&c!==undefined){
            if(a<=0||b<=0||c<=0)return{result:"Error: sides≤0",steps:"Sides >0."};
            const cosC=(a*a+b*b-c*c)/(2*a*b);
            if(Math.abs(cosC)>1)return{result:"Error: Impossible triangle",steps:`cosC=${cosC.toFixed(4)} outside [-1,1].`};
            const ang=toD(Math.acos(cosC));
            return{result:`C = ${ang.toFixed(4)}°`,steps:`cosC = (${a}²+${b}²−${c}²)/(2×${a}×${b}) = ${cosC.toFixed(4)}\nC = ${ang.toFixed(4)}°`};
          }
          if(a!==undefined&&c!==undefined&&C!==undefined){
            if(a<=0||c<=0)return{result:"Error: sides≤0",steps:"Sides >0."};
            const cosC=Math.cos(toR(C));
            const sinC=Math.sin(toR(C));
            const disc=a*a*cosC*cosC-(a*a-c*c);
            if(disc<0)return{result:"Error: No real solution",steps:"Discriminant < 0."};
            const b1=a*cosC+Math.sqrt(disc),b2=a*cosC-Math.sqrt(disc);
            const valid=[b1,b2].filter(v=>v>0);
            if(!valid.length)return{result:"Error: No valid b",steps:"No positive solution."};
            return{result:`b = ${valid.map(v=>v.toFixed(4)).join(" or ")}`,steps:`b²−2a·cosC·b+(a²−c²)=0\nDiscriminant=${disc.toFixed(4)}\nb = ${valid.map(v=>v.toFixed(4)).join(" or ")}`};
          }
          return null;
        }
      },
      {
        id: "compound-interest", name: "Compound Interest",
        description: "A=P(1+r/n)^(nt). Solves for Amount, Principal, Rate, Time, or Compounds.",
        equation: "A = P(1 + r/n)^(nt)",
        variables: [
          { id: "A", label: "Final Amount (A)", unit: "$" },
          { id: "P", label: "Principal (P)", unit: "$" },
          { id: "r", label: "Annual Rate (r)", unit: "%" },
          { id: "n", label: "Compounds/Year (n)", unit: "" },
          { id: "t", label: "Time (t)", unit: "years" }
        ],
        calculate: (vals) => {
          const {A,P,r,n,t}=vals;
          const kn=[A,P,r,n,t].filter(x=>x!==undefined).length;
          if(kn<4) return {result:"Need at least 4 of 5.",steps:"Provide at least 4."};
          const rate=(r||0)/100;
          if(A===undefined&&P!==undefined&&r!==undefined&&n!==undefined&&t!==undefined){
            const a=P*Math.pow(1+rate/n,n*t);const interest=a-P;
            return{result:`A = $${a.toFixed(2)} (Interest: $${interest.toFixed(2)})`,steps:`A = ${P}×(1+${rate}/${n})^(${n}×${t}) = $${a.toFixed(2)}`};
          }
          if(P===undefined&&A!==undefined&&r!==undefined&&n!==undefined&&t!==undefined){
            const p=A/Math.pow(1+rate/n,n*t);
            return{result:`P = $${p.toFixed(2)}`,steps:`P = A/(1+r/n)^(nt) = $${p.toFixed(2)}`};
          }
          if(r===undefined&&A!==undefined&&P!==undefined&&n!==undefined&&t!==undefined){
            if(P<=0||A<=0)return{result:"Error: A,P≤0",steps:"Must be >0."};
            const ratio=A/P;const base=Math.pow(ratio,1/(n*t));const rateVal=(base-1)*n*100;
            return{result:`r = ${rateVal.toFixed(4)}%`,steps:`(1+r/n)^(nt) = ${ratio.toFixed(4)}\nr = ${rateVal.toFixed(4)}%`};
          }
          if(t===undefined&&A!==undefined&&P!==undefined&&r!==undefined&&n!==undefined){
            if(P<=0||A<=0||rate<=0)return{result:"Error: Invalid",steps:"A,P,r >0."};
            const ratio=A/P;const logBase=Math.log(1+rate/n);if(logBase===0)return{result:"Error: r=0",steps:"Cannot solve with zero rate."};
            const time=Math.log(ratio)/(n*logBase);
            return{result:`t = ${time.toFixed(4)} years`,steps:`t = ln(A/P)/(n·ln(1+r/n)) = ${time.toFixed(4)} years`};
          }
          return null;
        }
      },
      {
        id: "logarithmic", name: "Logarithmic Equation",
        description: "y=log_b(x). Solves for any variable. Handles natural and base-10 logs.",
        equation: "y = log_b(x)",
        variables: [
          { id: "y", label: "Exponent (y)", unit: "" },
          { id: "b", label: "Base (b)", unit: "" },
          { id: "x", label: "Argument (x)", unit: "" }
        ],
        calculate: (vals) => {
          const {y,b,x}=vals;
          if(b!==undefined&&x!==undefined){if(b<=0||b===1||x<=0)return{result:"Error: Invalid base/argument",steps:"b>0, b≠1, x>0."};const r=Math.log(x)/Math.log(b);return{result:`y = ${r.toFixed(4)}`,steps:`y = log_${b}(${x}) = ln(${x})/ln(${b}) = ${r.toFixed(4)}`};}
          if(y!==undefined&&b!==undefined){if(b<=0||b===1)return{result:"Error: Invalid base",steps:"b>0, b≠1."};const r=Math.pow(b,y);return{result:`x = ${r.toFixed(4)}`,steps:`x = ${b}^${y} = ${r.toFixed(4)}`};}
          if(y!==undefined&&x!==undefined){if(x<=0)return{result:"Error: x≤0",steps:"x must be >0."};const r=Math.pow(x,1/y);if(r<=0||r===1)return{result:"Error: No valid base",steps:"Cannot find valid base."};return{result:`b = ${r.toFixed(4)}`,steps:`b = x^(1/y) = ${r.toFixed(4)}`};}
          return null;
        }
      }
    ]
  },
  {
    category: "Fluid Mechanics",
    icon: "Waves",
    formulas: [
      {
        id: "bernoulli", name: "Bernoulli's Equation",
        description: "P₁+½ρv₁²+ρgh₁ = P₂+½ρv₂²+ρgh₂. Solves for pressure, velocity, or height in fluid flow.",
        equation: "P + ½ρv² + ρgh = constant",
        variables: [
          { id: "P1", label: "Pressure 1 (P₁)", unit: "Pa" },
          { id: "v1", label: "Velocity 1 (v₁)", unit: "m/s" },
          { id: "h1", label: "Height 1 (h₁)", unit: "m" },
          { id: "P2", label: "Pressure 2 (P₂)", unit: "Pa" },
          { id: "v2", label: "Velocity 2 (v₂)", unit: "m/s" },
          { id: "h2", label: "Height 2 (h₂)", unit: "m" }
        ],
        calculate: (vals) => {
          const rho=1000,g=9.81;const {P1,v1,h1,P2,v2,h2}=vals;
          const kn=[P1,v1,h1,P2,v2,h2].filter(x=>x!==undefined).length;
          if(kn<5) return {result:"Need ≥5 of 6.",steps:"Provide at least 5."};
          if(P1===undefined&&P2!==undefined){const p=P2+.5*rho*(v2*v2-v1*v1)+rho*g*(h2-h1);return{result:`P₁ = ${p.toFixed(4)} Pa`,steps:`P₁ = P₂+½ρ(v₂²−v₁²)+ρg(h₂−h₁) = ${p.toFixed(4)} Pa`};}
          if(P2===undefined&&P1!==undefined){const p=P1+.5*rho*(v1*v1-v2*v2)+rho*g*(h1-h2);return{result:`P₂ = ${p.toFixed(4)} Pa`,steps:`P₂ = ${p.toFixed(4)} Pa`};}
          if(v1===undefined){const vs=2*((P2-P1)+rho*g*(h2-h1))/rho+v2*v2;if(vs<0)return{result:"Error: No real v₁",steps:"Check inputs."};return{result:`v₁ = ${Math.sqrt(vs).toFixed(4)} m/s`,steps:`v₁ = ${Math.sqrt(vs).toFixed(4)} m/s`};}
          if(v2===undefined){const vs=2*((P1-P2)+rho*g*(h1-h2))/rho+v1*v1;if(vs<0)return{result:"Error: No real v₂",steps:"Check inputs."};return{result:`v₂ = ${Math.sqrt(vs).toFixed(4)} m/s`,steps:`v₂ = ${Math.sqrt(vs).toFixed(4)} m/s`};}
          if(h1===undefined){const h=(P2-P1+.5*rho*(v2*v2-v1*v1)+rho*g*h2)/(rho*g);return{result:`h₁ = ${h.toFixed(4)} m`,steps:`h₁ = ${h.toFixed(4)} m`};}
          if(h2===undefined){const h=(P1-P2+.5*rho*(v1*v1-v2*v2)+rho*g*h1)/(rho*g);return{result:`h₂ = ${h.toFixed(4)} m`,steps:`h₂ = ${h.toFixed(4)} m`};}
          return null;
        }
      },
      {
        id: "archimedes", name: "Buoyancy (Archimedes)",
        description: "F_b = ρ_fluid × V_displaced × g. Solves for buoyant force, fluid density, or volume.",
        equation: "F_b = ρ × V × g",
        variables: [
          { id: "Fb", label: "Buoyant Force (F_b)", unit: "N" },
          { id: "rho", label: "Fluid Density (ρ)", unit: "kg/m³" },
          { id: "V", label: "Volume Displaced (V)", unit: "m³" }
        ],
        calculate: (vals) => {
          const g=9.81;const {Fb,rho,V}=vals;
          if(rho!==undefined&&V!==undefined) return{result:`F_b = ${(rho*V*g).toFixed(4)} N`,steps:`F_b = ${rho} × ${V} × ${g} = ${(rho*V*g).toFixed(4)} N`};
          if(Fb!==undefined&&V!==undefined){if(V*g===0)return{result:"Error: V=0",steps:"Volume must be >0."};return{result:`ρ = ${(Fb/(V*g)).toFixed(4)} kg/m³`,steps:`ρ = F_b/(Vg) = ${(Fb/(V*g)).toFixed(4)} kg/m³`};}
          if(Fb!==undefined&&rho!==undefined){if(rho*g===0)return{result:"Error: ρ=0",steps:"Density must be >0."};return{result:`V = ${(Fb/(rho*g)).toFixed(4)} m³`,steps:`V = F_b/(ρg) = ${(Fb/(rho*g)).toFixed(4)} m³`};}
          return null;
        }
      },
      {
        id: "continuity", name: "Continuity Equation",
        description: "A₁v₁ = A₂v₂. Solves for cross-section area or velocity in pipe flow.",
        equation: "A₁ × v₁ = A₂ × v₂",
        variables: [
          { id: "A1", label: "Area 1 (A₁)", unit: "m²" },
          { id: "v1", label: "Velocity 1 (v₁)", unit: "m/s" },
          { id: "A2", label: "Area 2 (A₂)", unit: "m²" },
          { id: "v2", label: "Velocity 2 (v₂)", unit: "m/s" }
        ],
        calculate: (vals) => {
          const {A1,v1,A2,v2}=vals;
          const kn=[A1,v1,A2,v2].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need ≥3 of 4.",steps:"Provide at least 3."};
          if(A1!==undefined&&v1!==undefined&&A2!==undefined){if(A2===0)return{result:"Error: A₂=0",steps:"Area must be >0."};return{result:`v₂ = ${(A1*v1/A2).toFixed(4)} m/s`,steps:`v₂ = A₁v₁/A₂ = ${(A1*v1/A2).toFixed(4)} m/s`};}
          if(A1!==undefined&&v1!==undefined&&v2!==undefined){if(v2===0)return{result:"Error: v₂=0",steps:"Velocity must be >0."};return{result:`A₂ = ${(A1*v1/v2).toFixed(4)} m²`,steps:`A₂ = A₁v₁/v₂ = ${(A1*v1/v2).toFixed(4)} m²`};}
          if(A1!==undefined&&A2!==undefined&&v2!==undefined){if(A1===0)return{result:"Error: A₁=0",steps:"Area must be >0."};return{result:`v₁ = ${(A2*v2/A1).toFixed(4)} m/s`,steps:`v₁ = A₂v₂/A₁ = ${(A2*v2/A1).toFixed(4)} m/s`};}
          if(v1!==undefined&&A2!==undefined&&v2!==undefined){if(v1===0)return{result:"Error: v₁=0",steps:"Velocity must be >0."};return{result:`A₁ = ${(A2*v2/v1).toFixed(4)} m²`,steps:`A₁ = A₂v₂/v₁ = ${(A2*v2/v1).toFixed(4)} m²`};}
          return null;
        }
      },
      {
        id: "poiseuille", name: "Poiseuille's Law",
        description: "Q = πr⁴ΔP/(8ηL). Solves for flow rate, radius, pressure, viscosity, or length.",
        equation: "Q = πr⁴ΔP / (8ηL)",
        variables: [
          { id: "Q", label: "Flow Rate (Q)", unit: "m³/s" },
          { id: "r", label: "Radius (r)", unit: "m" },
          { id: "dP", label: "Pressure Diff (ΔP)", unit: "Pa" },
          { id: "eta", label: "Viscosity (η)", unit: "Pa·s" },
          { id: "L", label: "Length (L)", unit: "m" }
        ],
        calculate: (vals) => {
          const {Q,r,dP,eta,L}=vals;
          const kn=[Q,r,dP,eta,L].filter(x=>x!==undefined).length;
          if(kn<4) return {result:"Need ≥4 of 5.",steps:"Provide at least 4."};
          if(Q===undefined&&r!==undefined&&dP!==undefined&&eta!==undefined&&L!==undefined){
            if(r<=0||eta<=0||L<=0)return{result:"Error: Invalid",steps:"r,η,L must be >0."};
            const q=Math.PI*Math.pow(r,4)*dP/(8*eta*L);return{result:`Q = ${q.toExponential(4)} m³/s`,steps:`Q = πr⁴ΔP/(8ηL) = ${q.toExponential(4)} m³/s`};
          }
          if(r===undefined&&Q!==undefined&&dP!==undefined&&eta!==undefined&&L!==undefined){
            if(dP===0||eta<=0||L<=0)return{result:"Error: Invalid",steps:"Check inputs."};
            const r4=Q*8*eta*L/(Math.PI*dP);if(r4<=0)return{result:"Error: No real r",steps:"Check inputs."};
            return{result:`r = ${Math.pow(r4,.25).toExponential(4)} m`,steps:`r⁴ = 8QηL/(πΔP) → r = ${Math.pow(r4,.25).toExponential(4)} m`};
          }
          if(dP===undefined&&Q!==undefined&&r!==undefined&&eta!==undefined&&L!==undefined){
            if(r<=0||eta<=0||L<=0)return{result:"Error: Invalid",steps:"Check inputs."};
            const dp=Q*8*eta*L/(Math.PI*Math.pow(r,4));return{result:`ΔP = ${dp.toFixed(4)} Pa`,steps:`ΔP = ${dp.toFixed(4)} Pa`};
          }
          if(eta===undefined&&Q!==undefined&&r!==undefined&&dP!==undefined&&L!==undefined){
            if(r<=0||dP===0||L<=0)return{result:"Error: Invalid",steps:"Check inputs."};
            const e=Q*8*L/(Math.PI*Math.pow(r,4)*dP);return{result:`η = ${e.toExponential(4)} Pa·s`,steps:`η = ${e.toExponential(4)} Pa·s`};
          }
          if(L===undefined&&Q!==undefined&&r!==undefined&&dP!==undefined&&eta!==undefined){
            if(r<=0||dP===0||eta<=0)return{result:"Error: Invalid",steps:"Check inputs."};
            const l=Q*8*eta/(Math.PI*Math.pow(r,4)*dP);return{result:`L = ${l.toFixed(4)} m`,steps:`L = ${l.toFixed(4)} m`};
          }
          return null;
        }
      }
    ]
  },
  {
    category: "Chemistry",
    icon: "Atom",
    formulas: [
      {
        id: "ph-calc", name: "pH / pOH Calculator",
        description: "pH=−log[H⁺], pOH=−log[OH⁻], pH+pOH=14. Solves for pH, pOH, [H⁺], or [OH⁻].",
        equation: "pH = −log₁₀[H⁺],  pH + pOH = 14",
        variables: [
          { id: "pH", label: "pH", unit: "" },
          { id: "pOH", label: "pOH", unit: "" },
          { id: "H", label: "[H⁺] (mol/L)", unit: "M" },
          { id: "OH", label: "[OH⁻] (mol/L)", unit: "M" }
        ],
        calculate: (vals) => {
          const {pH,pOH,H,OH}=vals;
          const kn=[pH,pOH,H,OH].filter(x=>x!==undefined).length;
          if(kn<1) return {result:"Need at least 1 value.",steps:"Provide pH, pOH, [H⁺], or [OH⁻]."};
          let cPH=pH,cPOH=pOH,cH=H,cOH=OH;
          if(cPH!==undefined){cPOH=14-cPH;cH=Math.pow(10,-cPH);cOH=Math.pow(10,-cPOH);}
          else if(cPOH!==undefined){cPH=14-cPOH;cH=Math.pow(10,-cPH);cOH=Math.pow(10,-cPOH);}
          else if(cH!==undefined){if(cH<=0)return{result:"Error: [H⁺]≤0",steps:"Concentration must be >0."};cPH=-Math.log10(cH);cPOH=14-cPH;cOH=Math.pow(10,-cPOH);}
          else if(cOH!==undefined){if(cOH<=0)return{result:"Error: [OH⁻]≤0",steps:"Concentration must be >0."};cPOH=-Math.log10(cOH);cPH=14-cPOH;cH=Math.pow(10,-cPH);}
          const nature=cPH<7?"Acidic":cPH>7?"Basic":"Neutral";
          return{result:`pH = ${cPH.toFixed(4)} | pOH = ${cPOH.toFixed(4)} | [H⁺] = ${cH.toExponential(4)} M | [OH⁻] = ${cOH.toExponential(4)} M (${nature})`,steps:`pH = ${cPH.toFixed(4)}\npOH = ${cPOH.toFixed(4)}\n[H⁺] = ${cH.toExponential(4)} M\n[OH⁻] = ${cOH.toExponential(4)} M\nSolution is ${nature}`};
        }
      },
      {
        id: "dilution", name: "Dilution Equation (M₁V₁=M₂V₂)",
        description: "M₁V₁=M₂V₂. Solves for any concentration or volume in dilution problems.",
        equation: "M₁ × V₁ = M₂ × V₂",
        variables: [
          { id: "M1", label: "Initial Conc (M₁)", unit: "M" },
          { id: "V1", label: "Initial Vol (V₁)", unit: "L" },
          { id: "M2", label: "Final Conc (M₂)", unit: "M" },
          { id: "V2", label: "Final Vol (V₂)", unit: "L" }
        ],
        calculate: (vals) => {
          const {M1,V1,M2,V2}=vals;
          const kn=[M1,V1,M2,V2].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need ≥3 of 4.",steps:"Provide at least 3."};
          if(M1===undefined) return{result:`M₁ = ${(M2*V2/V1).toFixed(4)} M`,steps:`M₁ = M₂V₂/V₁ = ${(M2*V2/V1).toFixed(4)} M`};
          if(V1===undefined) return{result:`V₁ = ${(M2*V2/M1).toFixed(4)} L`,steps:`V₁ = M₂V₂/M₁ = ${(M2*V2/M1).toFixed(4)} L`};
          if(M2===undefined) return{result:`M₂ = ${(M1*V1/V2).toFixed(4)} M`,steps:`M₂ = M₁V₁/V₂ = ${(M1*V1/V2).toFixed(4)} M`};
          if(V2===undefined) return{result:`V₂ = ${(M1*V1/M2).toFixed(4)} L`,steps:`V₂ = M₁V₁/M₂ = ${(M1*V1/M2).toFixed(4)} L`};
          return null;
        }
      },
      {
        id: "beer-lambert", name: "Beer-Lambert Law",
        description: "A=εlc. Solves for absorbance, molar absorptivity, path length, or concentration.",
        equation: "A = ε × l × c",
        variables: [
          { id: "A", label: "Absorbance (A)", unit: "" },
          { id: "epsilon", label: "Molar Absorptivity (ε)", unit: "L/(mol·cm)" },
          { id: "l", label: "Path Length (l)", unit: "cm" },
          { id: "c", label: "Concentration (c)", unit: "mol/L" }
        ],
        calculate: (vals) => {
          const {A,epsilon,l,c}=vals;
          const kn=[A,epsilon,l,c].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need ≥3 of 4.",steps:"Provide at least 3."};
          if(A===undefined) return{result:`A = ${(epsilon*l*c).toFixed(4)}`,steps:`A = εlc = ${(epsilon*l*c).toFixed(4)}`};
          if(epsilon===undefined){if(l*c===0)return{result:"Error: l·c=0",steps:"Cannot find ε."};return{result:`ε = ${(A/(l*c)).toFixed(4)} L/(mol·cm)`,steps:`ε = A/(lc) = ${(A/(l*c)).toFixed(4)}`};}
          if(l===undefined){if(epsilon*c===0)return{result:"Error: ε·c=0",steps:"Cannot find l."};return{result:`l = ${(A/(epsilon*c)).toFixed(4)} cm`,steps:`l = A/(εc) = ${(A/(epsilon*c)).toFixed(4)} cm`};}
          if(c===undefined){if(epsilon*l===0)return{result:"Error: ε·l=0",steps:"Cannot find c."};return{result:`c = ${(A/(epsilon*l)).toFixed(4)} mol/L`,steps:`c = A/(εl) = ${(A/(epsilon*l)).toFixed(4)} mol/L`};}
          return null;
        }
      },
      {
        id: "nernst", name: "Nernst Equation",
        description: "E=E°−(RT/nF)ln(Q). Solves for cell potential, standard potential, temperature, or reaction quotient.",
        equation: "E = E° − (RT/nF) × ln(Q)",
        variables: [
          { id: "E", label: "Cell Potential (E)", unit: "V" },
          { id: "E0", label: "Standard Potential (E°)", unit: "V" },
          { id: "n", label: "Electrons Transferred (n)", unit: "" },
          { id: "Q", label: "Reaction Quotient (Q)", unit: "" },
          { id: "T", label: "Temperature (T)", unit: "K" }
        ],
        calculate: (vals) => {
          const R=8.314,F=96485;const {E,E0,n,Q,T}=vals;
          const kn=[E,E0,n,Q,T].filter(x=>x!==undefined).length;
          if(kn<4) return {result:"Need ≥4 of 5.",steps:"Provide at least 4."};
          const cT=T!==undefined?T:298;
          if(Q!==undefined&&Q<=0)return{result:"Error: Q must be positive.",steps:"Reaction quotient Q > 0."};
          if(E===undefined){const e=E0-(R*cT/(n*F))*Math.log(Q);return{result:`E = ${e.toFixed(4)} V`,steps:`E = ${E0}−(${R}×${cT}/(${n}×${F}))×ln(${Q}) = ${e.toFixed(4)} V`};}
          if(E0===undefined){const e0=E+(R*cT/(n*F))*Math.log(Q);return{result:`E° = ${e0.toFixed(4)} V`,steps:`E° = E+(RT/nF)ln(Q) = ${e0.toFixed(4)} V`};}
          if(Q===undefined){const ratio=(E0-E)*n*F/(R*cT);if(ratio<-700)return{result:"Error: Q too small",steps:"ln(Q) overflow."};return{result:`Q = ${Math.exp(ratio).toExponential(4)}`,steps:`ln(Q) = ${(E0-E)*n*F/(R*cT)} → Q = ${Math.exp(ratio).toExponential(4)}`};}
          if(n===undefined){const logQ=Math.log(Q);if(logQ===0)return{result:"Error: Cannot find n (ln(Q)=0, Q=1).",steps:"Check inputs."};const denom=(E0-E)*F/(R*cT*logQ);if(denom===0)return{result:"Error: Cannot find n",steps:"Check inputs."};return{result:`n = ${Math.abs(Math.round(denom))}`,steps:`n = ${(Math.abs(Math.round(denom)))}`};}
          if(T===undefined){const logQ=Math.log(Q);if(logQ===0)return{result:"Error: Cannot find T (ln(Q)=0, Q=1).",steps:"Check inputs."};const t=(E0-E)*n*F/(R*logQ);return{result:`T = ${t.toFixed(4)} K`,steps:`T = ${t.toFixed(4)} K`};}
          return null;
        }
      },
      {
        id: "ideal-gas-molar", name: "Molar Mass from Gas Law",
        description: "M = mRT/(PV). Solves for molar mass, mass, pressure, volume, or temperature.",
        equation: "M = mRT / (PV)",
        variables: [
          { id: "M", label: "Molar Mass (M)", unit: "g/mol" },
          { id: "m", label: "Mass (m)", unit: "g" },
          { id: "P", label: "Pressure (P)", unit: "atm" },
          { id: "V", label: "Volume (V)", unit: "L" },
          { id: "T", label: "Temperature (T)", unit: "K" }
        ],
        calculate: (vals) => {
          const R=0.08206;const {M,m,P,V,T}=vals;
          const kn=[M,m,P,V,T].filter(x=>x!==undefined).length;
          if(kn<4) return {result:"Need ≥4 of 5.",steps:"Provide at least 4."};
          if(M===undefined){if(P===0||V===0)return{result:"Error: P or V=0",steps:"Cannot divide by zero."};const mm=m*R*T/(P*V);return{result:`M = ${mm.toFixed(4)} g/mol`,steps:`M = mRT/(PV) = ${mm.toFixed(4)} g/mol`};}
          if(m===undefined){return{result:`m = ${(M*P*V/(R*T)).toFixed(4)} g`,steps:`m = MPV/(RT) = ${(M*P*V/(R*T)).toFixed(4)} g`};}
          if(P===undefined){if(V===0)return{result:"Error: V=0",steps:"Cannot divide by zero."};const p=m*R*T/(M*V);return{result:`P = ${p.toFixed(4)} atm`,steps:`P = mRT/(MV) = ${p.toFixed(4)} atm`};}
          if(V===undefined){if(P===0)return{result:"Error: P=0",steps:"Cannot divide by zero."};const v=m*R*T/(M*P);return{result:`V = ${v.toFixed(4)} L`,steps:`V = mRT/(MP) = ${v.toFixed(4)} L`};}
          if(T===undefined){return{result:`T = ${(M*P*V/(m*R)).toFixed(4)} K`,steps:`T = MPV/(mR) = ${(M*P*V/(m*R)).toFixed(4)} K`};}
          return null;
        }
      }
    ]
  },
  {
    category: "Geometry",
    icon: "Calculator",
    formulas: [
      {
        id: "circle", name: "Circle Area & Circumference",
        description: "A=πr², C=2πr. Solves for Area, Circumference, Radius, or Diameter.",
        equation: "A = πr²,  C = 2πr",
        variables: [
          { id: "A", label: "Area (A)", unit: "m²" },
          { id: "C", label: "Circumference (C)", unit: "m" },
          { id: "r", label: "Radius (r)", unit: "m" }
        ],
        calculate: (vals) => {
          const {A,C,r}=vals;
          if(r!==undefined){if(r<0)return{result:"Error: r<0",steps:"Radius must be ≥0."};return{result:`A = ${(Math.PI*r*r).toFixed(4)} m² | C = ${(2*Math.PI*r).toFixed(4)} m`,steps:`A = π×${r}² = ${(Math.PI*r*r).toFixed(4)} m²\nC = 2π×${r} = ${(2*Math.PI*r).toFixed(4)} m`};}
          if(A!==undefined){if(A<0)return{result:"Error: A<0",steps:"Area must be ≥0."};const rv=Math.sqrt(A/Math.PI);return{result:`r = ${rv.toFixed(4)} m | C = ${(2*Math.PI*rv).toFixed(4)} m`,steps:`r = √(A/π) = ${rv.toFixed(4)} m`};}
          if(C!==undefined){if(C<0)return{result:"Error: C<0",steps:"Circumference must be ≥0."};const rv=C/(2*Math.PI);return{result:`r = ${rv.toFixed(4)} m | A = ${(Math.PI*rv*rv).toFixed(4)} m²`,steps:`r = C/(2π) = ${rv.toFixed(4)} m`};}
          return null;
        }
      },
      {
        id: "sphere", name: "Sphere Volume & Surface",
        description: "V=4/3πr³, A=4πr². Solves for Volume, Surface Area, or Radius.",
        equation: "V = (4/3)πr³,  A = 4πr²",
        variables: [
          { id: "V", label: "Volume (V)", unit: "m³" },
          { id: "SA", label: "Surface Area (A)", unit: "m²" },
          { id: "r", label: "Radius (r)", unit: "m" }
        ],
        calculate: (vals) => {
          const {V,SA,r}=vals;
          if(r!==undefined){if(r<0)return{result:"Error: r<0",steps:"Radius ≥0."};const v=4/3*Math.PI*r*r*r;const a=4*Math.PI*r*r;return{result:`V = ${v.toFixed(4)} m³ | A = ${a.toFixed(4)} m²`,steps:`V = (4/3)πr³ = ${v.toFixed(4)} m³\nA = 4πr² = ${a.toFixed(4)} m²`};}
          if(V!==undefined){if(V<0)return{result:"Error: V<0",steps:"Volume ≥0."};const rv=Math.pow(3*V/(4*Math.PI),1/3);const a=4*Math.PI*rv*rv;return{result:`r = ${rv.toFixed(4)} m | A = ${a.toFixed(4)} m²`,steps:`r = ∛(3V/4π) = ${rv.toFixed(4)} m`};}
          if(SA!==undefined){if(SA<0)return{result:"Error: A<0",steps:"Area ≥0."};const rv=Math.sqrt(SA/(4*Math.PI));const v=4/3*Math.PI*rv*rv*rv;return{result:`r = ${rv.toFixed(4)} m | V = ${v.toFixed(4)} m³`,steps:`r = √(A/4π) = ${rv.toFixed(4)} m`};}
          return null;
        }
      },
      {
        id: "cylinder", name: "Cylinder Volume & Surface",
        description: "V=πr²h. Solves for Volume, Radius, or Height of a cylinder.",
        equation: "V = πr²h",
        variables: [
          { id: "V", label: "Volume (V)", unit: "m³" },
          { id: "r", label: "Radius (r)", unit: "m" },
          { id: "h", label: "Height (h)", unit: "m" }
        ],
        calculate: (vals) => {
          const {V,r,h}=vals;
          if(r!==undefined&&h!==undefined){if(r<0||h<0)return{result:"Error: Negative",steps:"r,h ≥0."};return{result:`V = ${(Math.PI*r*r*h).toFixed(4)} m³`,steps:`V = π×${r}²×${h} = ${(Math.PI*r*r*h).toFixed(4)} m³`};}
          if(V!==undefined&&r!==undefined){if(r<=0)return{result:"Error: r≤0",steps:"Radius >0."};return{result:`h = ${(V/(Math.PI*r*r)).toFixed(4)} m`,steps:`h = V/(πr²) = ${(V/(Math.PI*r*r)).toFixed(4)} m`};}
          if(V!==undefined&&h!==undefined){if(h<=0)return{result:"Error: h≤0",steps:"Height >0."};const rv=Math.sqrt(V/(Math.PI*h));return{result:`r = ${rv.toFixed(4)} m`,steps:`r = √(V/(πh)) = ${rv.toFixed(4)} m`};}
          return null;
        }
      },
      {
        id: "triangle-area", name: "Triangle Area (Heron's)",
        description: "A=√(s(s−a)(s−b)(s−c)) where s=(a+b+c)/2. Solves for area from 3 sides.",
        equation: "A = √(s(s−a)(s−b)(s−c)),  s = (a+b+c)/2",
        variables: [
          { id: "a", label: "Side a", unit: "" },
          { id: "b", label: "Side b", unit: "" },
          { id: "c", label: "Side c", unit: "" }
        ],
        calculate: (vals) => {
          const {a,b,c}=vals;
          if(a===undefined||b===undefined||c===undefined) return{result:"All 3 sides required.",steps:"Need a, b, c."};
          if(a<=0||b<=0||c<=0) return{result:"Error: Sides ≤0",steps:"All sides must be >0."};
          if(a+b<=c||a+c<=b||b+c<=a) return{result:"Error: Invalid triangle",steps:"Sum of any 2 sides must be > the 3rd."};
          const s=(a+b+c)/2;
          const area=Math.sqrt(s*(s-a)*(s-b)*(s-c));
          return{result:`Area = ${area.toFixed(4)} | Perimeter = ${(a+b+c).toFixed(4)} | Semi-perimeter = ${s.toFixed(4)}`,steps:`s = (${a}+${b}+${c})/2 = ${s.toFixed(4)}\nA = √(${s.toFixed(4)}×${(s-a).toFixed(4)}×${(s-b).toFixed(4)}×${(s-c).toFixed(4)}) = ${area.toFixed(4)}`};
        }
      },
      {
        id: "trig-ratios", name: "Trigonometric Ratios",
        description: "sin, cos, tan from angle. Also finds angle from ratio. Full SOH-CAH-TOA solver.",
        equation: "sin(θ)=opp/hyp, cos(θ)=adj/hyp, tan(θ)=opp/adj",
        variables: [
          { id: "theta", label: "Angle (θ)", unit: "°" },
          { id: "opp", label: "Opposite", unit: "" },
          { id: "adj", label: "Adjacent", unit: "" },
          { id: "hyp", label: "Hypotenuse", unit: "" }
        ],
        calculate: (vals) => {
          const toR=d=>d*Math.PI/180,toD=r=>r*180/Math.PI;
          const {theta,opp,adj,hyp}=vals;
          const kn=[theta,opp,adj,hyp].filter(x=>x!==undefined).length;
          if(kn<2) return {result:"Need ≥2 of 4.",steps:"Provide at least 2."};
          // Angle + 1 side
          if(theta!==undefined&&opp!==undefined&&adj===undefined&&hyp===undefined){
            const s=Math.sin(toR(theta)),c=Math.cos(toR(theta)),t=Math.tan(toR(theta));
            const h=opp/s,a=opp/t;
            return{result:`sin=${s.toFixed(4)} | cos=${c.toFixed(4)} | tan=${t.toFixed(4)}\nHyp = ${h.toFixed(4)} | Adj = ${a.toFixed(4)}`,steps:`sin(${theta}°) = ${s.toFixed(4)}\ncos(${theta}°) = ${c.toFixed(4)}\ntan(${theta}°) = ${t.toFixed(4)}\nHyp = opp/sin = ${h.toFixed(4)}\nAdj = opp/tan = ${a.toFixed(4)}`};
          }
          // 2 sides → angle + 3rd side
          if(theta===undefined){
            if(opp!==undefined&&hyp!==undefined){if(hyp===0)return{result:"Error: hyp=0",steps:"Hypotenuse >0."};const s=opp/hyp;if(Math.abs(s)>1)return{result:"Error: |opp/hyp|>1",steps:"Invalid ratio."};const ang=toD(Math.asin(s));const a=Math.sqrt(hyp*hyp-opp*opp);return{result:`θ = ${ang.toFixed(4)}° | Adj = ${a.toFixed(4)}`,steps:`sin(θ) = ${opp}/${hyp} = ${s.toFixed(4)} → θ = ${ang.toFixed(4)}°`};}
            if(adj!==undefined&&hyp!==undefined){if(hyp===0)return{result:"Error: hyp=0",steps:"Hypotenuse >0."};const c=adj/hyp;if(Math.abs(c)>1)return{result:"Error: |adj/hyp|>1",steps:"Invalid ratio."};const ang=toD(Math.acos(c));const o=Math.sqrt(hyp*hyp-adj*adj);return{result:`θ = ${ang.toFixed(4)}° | Opp = ${o.toFixed(4)}`,steps:`cos(θ) = ${adj}/${hyp} = ${c.toFixed(4)} → θ = ${ang.toFixed(4)}°`};}
            if(opp!==undefined&&adj!==undefined){if(adj===0)return{result:"Error: adj=0",steps:"Adjacent >0."};const t=opp/adj;const ang=toD(Math.atan(t));const h=Math.sqrt(opp*opp+adj*adj);return{result:`θ = ${ang.toFixed(4)}° | Hyp = ${h.toFixed(4)}`,steps:`tan(θ) = ${opp}/${adj} = ${t.toFixed(4)} → θ = ${ang.toFixed(4)}°`};}
          }
          // Angle + hyp → opp, adj
          if(theta!==undefined&&hyp!==undefined){
            const o=hyp*Math.sin(toR(theta)),a=hyp*Math.cos(toR(theta));
            return{result:`Opp = ${o.toFixed(4)} | Adj = ${a.toFixed(4)}`,steps:`Opp = hyp×sin(${theta}°) = ${o.toFixed(4)}\nAdj = hyp×cos(${theta}°) = ${a.toFixed(4)}`};
          }
          return null;
        }
      }
    ]
  },
  {
    category: "Electronics",
    icon: "Zap",
    formulas: [
      {
        id: "voltage-divider", name: "Voltage Divider",
        description: "V_out = V_in × R₂/(R₁+R₂). Solves for output voltage, input, or either resistor.",
        equation: "V_out = V_in × R₂ / (R₁ + R₂)",
        variables: [
          { id: "Vin", label: "Input Voltage (V_in)", unit: "V" },
          { id: "R1", label: "Resistor R₁", unit: "Ω" },
          { id: "R2", label: "Resistor R₂", unit: "Ω" },
          { id: "Vout", label: "Output Voltage (V_out)", unit: "V" }
        ],
        calculate: (vals) => {
          const {Vin,R1,R2,Vout}=vals;
          const kn=[Vin,R1,R2,Vout].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need ≥3 of 4.",steps:"Provide at least 3."};
          if(Vin!==undefined&&R1!==undefined&&R2!==undefined){if(R1+R2===0)return{result:"Error: R₁+R₂=0",steps:"Total resistance >0."};return{result:`V_out = ${(Vin*R2/(R1+R2)).toFixed(4)} V`,steps:`V_out = ${Vin}×${R2}/(${R1}+${R2}) = ${(Vin*R2/(R1+R2)).toFixed(4)} V`};}
          if(Vout!==undefined&&R1!==undefined&&R2!==undefined){if(R2===0)return{result:"Error: R₂=0",steps:"R₂ must be >0."};return{result:`V_in = ${(Vout*(R1+R2)/R2).toFixed(4)} V`,steps:`V_in = V_out×(R₁+R₂)/R₂ = ${(Vout*(R1+R2)/R2).toFixed(4)} V`};}
          if(Vin!==undefined&&Vout!==undefined&&R2!==undefined){if(Vout===Vin)return{result:"Error: V_out=V_in",steps:"R₁=0 (direct connection)."};const r1=R2*(Vin-Vout)/Vout;return{result:`R₁ = ${r1.toFixed(4)} Ω`,steps:`R₁ = R₂×(V_in−V_out)/V_out = ${r1.toFixed(4)} Ω`};}
          if(Vin!==undefined&&Vout!==undefined&&R1!==undefined){if(Vout===0)return{result:"Error: V_out=0",steps:"R₂=0."};const r2=R1*Vout/(Vin-Vout);return{result:`R₂ = ${r2.toFixed(4)} Ω`,steps:`R₂ = R₁×V_out/(V_in−V_out) = ${r2.toFixed(4)} Ω`};}
          return null;
        }
      },
      {
        id: "parallel-resistance", name: "Parallel Resistance",
        description: "1/R_total = 1/R₁ + 1/R₂ + 1/R₃. Solves for total or any individual resistance.",
        equation: "1/R_t = 1/R₁ + 1/R₂ + 1/R₃",
        variables: [
          { id: "Rt", label: "Total Resistance (R_t)", unit: "Ω" },
          { id: "R1", label: "Resistor 1 (R₁)", unit: "Ω" },
          { id: "R2", label: "Resistor 2 (R₂)", unit: "Ω" },
          { id: "R3", label: "Resistor 3 (R₃)", unit: "Ω" }
        ],
        calculate: (vals) => {
          const {Rt,R1,R2,R3}=vals;
          const kn=[Rt,R1,R2,R3].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need ≥3 of 4.",steps:"Provide at least 3."};
          if(R1!==undefined&&R2!==undefined&&R3!==undefined){const inv=1/R1+1/R2+1/R3;if(inv===0)return{result:"Error: No solution",steps:"Check inputs."};return{result:`R_t = ${(1/inv).toFixed(4)} Ω`,steps:`1/R_t = 1/${R1}+1/${R2}+1/${R3} = ${inv.toFixed(6)}\nR_t = ${(1/inv).toFixed(4)} Ω`};}
          if(Rt!==undefined&&R2!==undefined&&R3!==undefined){const invRt=1/Rt;const invR23=1/R2+1/R3;const invR1=invRt-invR23;if(invR1<=0)return{result:"Error: No valid R₁",steps:"Check inputs."};return{result:`R₁ = ${(1/invR1).toFixed(4)} Ω`,steps:`1/R₁ = 1/R_t−1/R₂−1/R₃ → R₁ = ${(1/invR1).toFixed(4)} Ω`};}
          if(Rt!==undefined&&R1!==undefined&&R3!==undefined){const invRt=1/Rt;const invR13=1/R1+1/R3;const invR2=invRt-invR13;if(invR2<=0)return{result:"Error: No valid R₂",steps:"Check inputs."};return{result:`R₂ = ${(1/invR2).toFixed(4)} Ω`,steps:`R₂ = ${(1/invR2).toFixed(4)} Ω`};}
          if(Rt!==undefined&&R1!==undefined&&R2!==undefined){const invRt=1/Rt;const invR12=1/R1+1/R2;const invR3=invRt-invR12;if(invR3<=0)return{result:"Error: No valid R₃",steps:"Check inputs."};return{result:`R₃ = ${(1/invR3).toFixed(4)} Ω`,steps:`R₃ = ${(1/invR3).toFixed(4)} Ω`};}
          return null;
        }
      },
      {
        id: "rl-discharge", name: "RL Circuit (Inductor)",
        description: "I(t)=I₀e^(−Rt/L), τ=L/R. Solves for current, time constant, or time.",
        equation: "I(t) = I₀ × e^(−Rt/L),  τ = L/R",
        variables: [
          { id: "It", label: "Current at t (I(t))", unit: "A" },
          { id: "I0", label: "Initial Current (I₀)", unit: "A" },
          { id: "R", label: "Resistance (R)", unit: "Ω" },
          { id: "L", label: "Inductance (L)", unit: "H" },
          { id: "t", label: "Time (t)", unit: "s" }
        ],
        calculate: (vals) => {
          const {It,I0,R,L,t}=vals;
          const kn=[It,I0,R,L,t].filter(x=>x!==undefined).length;
          if(kn<4) return {result:"Need ≥4 of 5.",steps:"Provide at least 4."};
          if(It===undefined&&I0!==undefined&&R!==undefined&&L!==undefined&&t!==undefined){
            const tau=L/R;const i=I0*Math.exp(-R*t/L);const pct=(i/I0*100).toFixed(2);
            return{result:`I(${t}s) = ${i.toFixed(6)} A (${pct}% of I₀)`,steps:`τ = L/R = ${tau.toExponential(4)} s\nI(t) = ${i.toFixed(6)} A`};
          }
          if(t===undefined&&It!==undefined&&I0!==undefined&&R!==undefined&&L!==undefined){
            if(It<=0||I0<=0)return{result:"Error: Currents must be >0.",steps:"Check inputs."};
            if(It>=I0)return{result:"Error: I(t)≥I₀",steps:"Current cannot increase in RL decay."};
            const cT=-L/R*Math.log(It/I0);
            return{result:`t = ${cT.toExponential(4)} s`,steps:`t = −(L/R)×ln(I(t)/I₀) = ${cT.toExponential(4)} s`};
          }
          if(R===undefined&&It!==undefined&&I0!==undefined&&L!==undefined&&t!==undefined){
            if(t===0)return{result:"Error: t=0",steps:"Cannot find R at t=0."};
            const r=-L/t*Math.log(It/I0);
            return{result:`R = ${r.toFixed(4)} Ω`,steps:`R = ${r.toFixed(4)} Ω`};
          }
          if(L===undefined&&It!==undefined&&I0!==undefined&&R!==undefined&&t!==undefined){
            const l=-R*t/Math.log(It/I0);
            return{result:`L = ${l.toExponential(4)} H`,steps:`L = ${l.toExponential(4)} H`};
          }
          return null;
        }
      },
      {
        id: "transformer", name: "Transformer Equation",
        description: "V_s/V_p = N_s/N_p. Solves for voltages or turns ratio in transformers.",
        equation: "V_s / V_p = N_s / N_p",
        variables: [
          { id: "Vs", label: "Secondary Voltage (V_s)", unit: "V" },
          { id: "Vp", label: "Primary Voltage (V_p)", unit: "V" },
          { id: "Ns", label: "Secondary Turns (N_s)", unit: "" },
          { id: "Np", label: "Primary Turns (N_p)", unit: "" }
        ],
        calculate: (vals) => {
          const {Vs,Vp,Ns,Np}=vals;
          const kn=[Vs,Vp,Ns,Np].filter(x=>x!==undefined).length;
          if(kn<3) return {result:"Need ≥3 of 4.",steps:"Provide at least 3."};
          if(Vs===undefined) return{result:`V_s = ${(Vp*Ns/Np).toFixed(4)} V`,steps:`V_s = V_p×N_s/N_p = ${(Vp*Ns/Np).toFixed(4)} V`};
          if(Vp===undefined) return{result:`V_p = ${(Vs*Np/Ns).toFixed(4)} V`,steps:`V_p = V_s×N_p/N_s = ${(Vs*Np/Ns).toFixed(4)} V`};
          if(Ns===undefined) return{result:`N_s = ${(Vs*Np/Vp).toFixed(0)} turns`,steps:`N_s = V_s×N_p/V_p = ${(Vs*Np/Vp).toFixed(0)}`};
          if(Np===undefined) return{result:`N_p = ${(Vp*Ns/Vs).toFixed(0)} turns`,steps:`N_p = V_p×N_s/V_s = ${(Vp*Ns/Vs).toFixed(0)}`};
          return null;
        }
      }
    ]
  },
  {
    category: "Statistics",
    icon: "Calculator",
    formulas: [
      {
        id: "mean-std", name: "Mean & Standard Deviation",
        description: "Computes mean, sample and population standard deviation from a list of numbers.",
        equation: "μ = Σx/n,  σ = √(Σ(x−μ)²/n)",
        variables: [
          { id: "data", label: "Data (comma-separated)", unit: "" }
        ],
        calculate: (vals) => {
          const raw = vals["data"];
          if (raw === undefined || raw === null) return {result:"Enter comma-separated numbers.",steps:"e.g. 10, 20, 30, 40"};
          const str = String(raw);
          const nums = str.split(",").map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
          if (nums.length < 2) return {result:"Need at least 2 numbers.",steps:"Enter more values."};
          const n = nums.length;
          const mean = nums.reduce((a,b)=>a+b,0)/n;
          const variance = nums.reduce((a,x)=>a+(x-mean)**2,0)/n;
          const sampleVar = nums.reduce((a,x)=>a+(x-mean)**2,0)/(n-1);
          const stdPop = Math.sqrt(variance);
          const stdSample = Math.sqrt(sampleVar);
          const sorted = [...nums].sort((a,b)=>a-b);
          const median = n%2===0 ? (sorted[n/2-1]+sorted[n/2])/2 : sorted[Math.floor(n/2)];
          return{result:`Mean = ${mean.toFixed(4)} | Median = ${median.toFixed(4)}\nσ (population) = ${stdPop.toFixed(4)} | s (sample) = ${stdSample.toFixed(4)}\nn = ${n} | Min = ${sorted[0]} | Max = ${sorted[n-1]}`,steps:`Data: [${nums.join(", ")}]\nn = ${n}\nMean = Σx/n = ${mean.toFixed(4)}\nσ = √(Σ(x−μ)²/n) = ${stdPop.toFixed(4)}\ns = √(Σ(x−x̄)²/(n−1)) = ${stdSample.toFixed(4)}`};
        }
      },
      {
        id: "linear-regression", name: "Linear Regression (y=mx+b)",
        description: "Fits y=mx+b to data points. Computes slope, intercept, and R² correlation.",
        equation: "y = mx + b,  m = (nΣxy−ΣxΣy)/(nΣx²−(Σx)²)",
        variables: [
          { id: "xdata", label: "X values (comma-sep)", unit: "" },
          { id: "ydata", label: "Y values (comma-sep)", unit: "" }
        ],
        calculate: (vals) => {
          const xRaw = vals["xdata"], yRaw = vals["ydata"];
          if (!xRaw || !yRaw) return {result:"Enter both X and Y data.",steps:"Comma-separated."};
          const xs = String(xRaw).split(",").map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
          const ys = String(yRaw).split(",").map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
          if (xs.length<2||ys.length<2||xs.length!==ys.length) return {result:`Error: Need equal X,Y counts (got ${xs.length} x, ${ys.length} y).`,steps:"Check data."};
          const n=xs.length;
          const sx=xs.reduce((a,b)=>a+b,0), sy=ys.reduce((a,b)=>a+b,0);
          const sxy=xs.reduce((a,x,i)=>a+x*ys[i],0);
          const sx2=xs.reduce((a,x)=>a+x*x,0);
          const sy2=ys.reduce((a,y)=>a+y*y,0);
          const denom=n*sx2-sx*sx;
          if(denom===0) return{result:"Error: Vertical line",steps:"All X values are the same."};
          const m=(n*sxy-sx*sy)/denom;
          const b=(sy-m*sx)/n;
          const yMean=sy/n;
          const ssTot=ys.reduce((a,y)=>a+(y-yMean)**2,0);
          const ssRes=ys.reduce((a,y,i)=>a+(y-(m*xs[i]+b))**2,0);
          const r2=ssTot===0?1:1-ssRes/ssTot;
          const r=Math.sqrt(r2)*(m>=0?1:-1);
          return{result:`y = ${m.toFixed(4)}x ${b>=0?"+":""} ${b.toFixed(4)}\nR² = ${r2.toFixed(4)} | r = ${r.toFixed(4)}`,steps:`n=${n}\nSlope m = ${m.toFixed(6)}\nIntercept b = ${b.toFixed(6)}\nR² = ${r2.toFixed(4)}\ny = ${m.toFixed(4)}x ${b>=0?"+":""} ${b.toFixed(4)}`};
        }
      },
      {
        id: "permutation-combination", name: "Permutations & Combinations",
        description: "nPr = n!/(n−r)!, nCr = n!/(r!(n−r)!). Solves for P, C, n, or r.",
        equation: "nPr = n!/(n−r)!,  nCr = n!/(r!(n−r)!)",
        variables: [
          { id: "n", label: "Total items (n)", unit: "" },
          { id: "r", label: "Choosing (r)", unit: "" }
        ],
        calculate: (vals) => {
          const {n,r}=vals;
          if(n===undefined||r===undefined) return{result:"Need n and r.",steps:"Provide both values."};
          if(n<0||r<0||r>n||!Number.isInteger(n)||!Number.isInteger(r)) return{result:"Error: Invalid n,r",steps:"n≥r≥0, both integers."};
          const fact=x=>{let f=1;for(let i=2;i<=x;i++)f*=i;return f;};
          const perm=fact(n)/fact(n-r);
          const comb=fact(n)/(fact(r)*fact(n-r));
          return{result:`nPr = ${perm.toExponential(4)} (${perm.toLocaleString()})\nnCr = ${comb.toExponential(4)} (${comb.toLocaleString()})`,steps:`${n}P${r} = ${n}!/(${n}−${r})! = ${perm.toLocaleString()}\n${n}C${r} = ${n}!/(${r}!×${n}-${r}!) = ${comb.toLocaleString()}`};
        }
      }
    ]
  },
  {
    category: "Advanced Mechanics",
    icon: "Cog",
    formulas: [
      {
        id: "centripetal-force", name: "Centripetal Force",
        description: "F=mv²/r. Solves for force, mass, velocity, or radius. Also computes period and frequency.",
        equation: "F = mv²/r = mω²r",
        variables: [
          { id: "F", label: "Centripetal Force", unit: "N" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "v", label: "Tangential Velocity", unit: "m/s" },
          { id: "r", label: "Radius", unit: "m" }
        ],
        calculate: (vals) => {
          const {F,m,v,r}=vals;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oF=F,om=m,ov=v,or=r,steps="";
          if(F===undefined){oF=m*v*v/r;steps=`F = mv²/r = ${m}×${v}²/${r} = ${oF.toFixed(4)} N`;}
          else if(m===undefined){om=F*r/(v*v);steps=`m = Fr/v² = ${F}×${r}/${v*v} = ${om.toFixed(4)} kg`;}
          else if(v===undefined){ov=Math.sqrt(F*r/m);steps=`v = √(Fr/m) = √(${F}×${r}/${m}) = ${ov.toFixed(4)} m/s`;}
          else if(r===undefined){or=m*v*v/F;steps=`r = mv²/F = ${m}×${v}²/${F} = ${or.toFixed(4)} m`;}
          const omega=ov/or;
          const T=2*Math.PI/omega;
          const freq=1/T;
          const ac=ov*ov/or;
          return{result:`F = ${oF.toFixed(4)} N | m = ${om.toFixed(4)} kg\nv = ${ov.toFixed(4)} m/s | r = ${or.toFixed(4)} m\nω = ${omega.toFixed(4)} rad/s | T = ${T.toFixed(4)} s\nf = ${freq.toFixed(4)} Hz | a_c = ${ac.toFixed(4)} m/s²`,steps:steps+`\nω = v/r = ${ov.toFixed(4)}/${or.toFixed(4)} = ${omega.toFixed(4)} rad/s\nPeriod T = 2π/ω = ${T.toFixed(4)} s\nCentripetal accel a_c = v²/r = ${ac.toFixed(4)} m/s²`};
        }
      },
      {
        id: "torque", name: "Torque",
        description: "τ=rFsinθ. Solves for torque, lever arm, force, or angle. Computes power at given RPM.",
        equation: "τ = rF sin(θ)",
        variables: [
          { id: "tau", label: "Torque", unit: "N·m" },
          { id: "r", label: "Lever Arm", unit: "m" },
          { id: "F", label: "Force", unit: "N" },
          { id: "theta", label: "Angle between r and F", unit: "°" }
        ],
        calculate: (vals) => {
          const {tau,r,F,theta}=vals;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oTau=tau,oR=r,oF=F,oTheta=theta,steps="";
          const deg2rad=d=>d*Math.PI/180;
          const rad2deg=r=>r*180/Math.PI;
          if(tau===undefined){const th=deg2rad(theta);oTau=r*F*Math.sin(th);steps=`τ = rFsinθ = ${r}×${F}×sin(${theta}°) = ${oTau.toFixed(4)} N·m`;}
          else if(r===undefined){const th=deg2rad(theta);oR=tau/(F*Math.sin(th));steps=`r = τ/(Fsinθ) = ${tau}/(${F}×sin(${theta}°)) = ${oR.toFixed(4)} m`;}
          else if(F===undefined){const th=deg2rad(theta);oF=tau/(r*Math.sin(th));steps=`F = τ/(rsinθ) = ${tau}/(${r}×sin(${theta}°)) = ${oF.toFixed(4)} N`;}
          else if(theta===undefined){const sinVal=tau/(r*F);if(Math.abs(sinVal)>1)return{result:"Error: No valid angle (|τ/(rF)| > 1)",steps:"The ratio exceeds 1, check inputs."};oTheta=rad2deg(Math.asin(sinVal));steps=`sinθ = τ/(rF) = ${tau}/(${r}×${F}) = ${sinVal.toFixed(4)}\nθ = arcsin(${sinVal.toFixed(4)}) = ${oTheta.toFixed(2)}°`;}
          const power=oTau*2*Math.PI*60/60;
          return{result:`τ = ${oTau.toFixed(4)} N·m | r = ${oR.toFixed(4)} m\nF = ${oF.toFixed(4)} N | θ = ${oTheta.toFixed(2)}°\nAt 1 RPM: Power = ${power.toFixed(4)} W`,steps};
        }
      },
      {
        id: "angular-momentum", name: "Angular Momentum",
        description: "L=Iω. Solves for angular momentum, moment of inertia, or angular velocity.",
        equation: "L = Iω = mvr (point mass)",
        variables: [
          { id: "L", label: "Angular Momentum", unit: "kg·m²/s" },
          { id: "I", label: "Moment of Inertia", unit: "kg·m²" },
          { id: "omega", label: "Angular Velocity", unit: "rad/s" }
        ],
        calculate: (vals) => {
          const {L,I,omega}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oL=L,oI=I,oOmega=omega,steps="";
          if(L===undefined){oL=I*omega;steps=`L = Iω = ${I}×${omega} = ${oL.toFixed(4)} kg·m²/s`;}
          else if(I===undefined){oI=L/omega;steps=`I = L/ω = ${L}/${omega} = ${oI.toFixed(4)} kg·m²`;}
          else if(omega===undefined){oOmega=L/I;steps=`ω = L/I = ${L}/${I} = ${oOmega.toFixed(4)} rad/s`;}
          const KE=0.5*oI*oOmega*oOmega;
          const freq=oOmega/(2*Math.PI);
          const period=1/freq;
          return{result:`L = ${oL.toFixed(4)} kg·m²/s\nI = ${oI.toFixed(4)} kg·m² | ω = ${oOmega.toFixed(4)} rad/s\nRotational KE = ½Iω² = ${KE.toFixed(4)} J\nf = ${freq.toFixed(4)} Hz | T = ${period.toFixed(4)} s`,steps:steps+`\nKE = ½Iω² = ${KE.toFixed(4)} J`};
        }
      },
      {
        id: "rocket-equation", name: "Tsiolkovsky Rocket Equation",
        description: "Δv=ve·ln(m₀/mf). Solves for delta-v, exhaust velocity, initial mass, or final mass.",
        equation: "Δv = vₑ × ln(m₀/mf)",
        variables: [
          { id: "dv", label: "Delta-v (Δv)", unit: "m/s" },
          { id: "ve", label: "Exhaust Velocity", unit: "m/s" },
          { id: "m0", label: "Initial Mass (m₀)", unit: "kg" },
          { id: "mf", label: "Final Mass (mf)", unit: "kg" }
        ],
        calculate: (vals) => {
          const {dv,ve,m0,mf}=vals;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oDv=dv,oVe=ve,oM0=m0,oMf=mf,steps="";
          if(m0!==undefined&&mf!==undefined&&m0<=0||mf<=0)return{result:"Error: Masses must be positive.",steps:"m₀ > 0, mf > 0."};
          if(m0!==undefined&&mf!==undefined){const mr=m0/mf;if(mr<=0)return{result:"Error: m₀/mf must be positive.",steps:"Check mass values."};}
          if(dv===undefined){oDv=ve*Math.log(m0/mf);steps=`Δv = ve×ln(m₀/mf) = ${ve}×ln(${m0}/${mf}) = ${oDv.toFixed(4)} m/s`;}
          else if(ve===undefined){const logVal=Math.log(m0/mf);if(logVal===0)return{result:"Error: m₀=mf, cannot solve for ve.",steps:"m₀ must differ from mf."};oVe=dv/logVal;steps=`ve = Δv/ln(m₀/mf) = ${dv}/ln(${m0}/${mf}) = ${oVe.toFixed(4)} m/s`;}
          else if(m0===undefined){oMf=mf;oM0=mf*Math.exp(dv/ve);steps=`m₀ = mf×e^(Δv/ve) = ${mf}×e^(${dv}/${ve}) = ${oM0.toFixed(4)} kg`;}
          else if(mf===undefined){oMf=m0*Math.exp(-dv/ve);steps=`mf = m₀×e^(-Δv/ve) = ${m0}×e^(-${dv}/${ve}) = ${oMf.toFixed(4)} kg`;}
          if(oM0<=oMf) return{result:"Error: Initial mass must exceed final mass.",steps:"m₀ > mf required."};
          const massRatio=oM0/oMf;
          const propellant=oM0-oMf;
          const Isp=oVe/9.81;
          return{result:`Δv = ${oDv.toFixed(2)} m/s (${(oDv/1000).toFixed(2)} km/s)\nve = ${oVe.toFixed(2)} m/s | Isp = ${Isp.toFixed(2)} s\nm₀ = ${oM0.toFixed(2)} kg | mf = ${oMf.toFixed(2)} kg\nPropellant = ${propellant.toFixed(2)} kg | Mass ratio = ${massRatio.toFixed(4)}`,steps:steps+`\nIsp = ve/g₀ = ${Isp.toFixed(2)} s\nPropellant mass = m₀−mf = ${propellant.toFixed(2)} kg`};
        }
      },
      {
        id: "pendulum-period", name: "Simple Pendulum",
        description: "T=2π√(L/g). Solves for period, length, or gravity. Also computes frequency and max speed.",
        equation: "T = 2π√(L/g)",
        variables: [
          { id: "T", label: "Period", unit: "s" },
          { id: "L", label: "Length", unit: "m" },
          { id: "g", label: "Gravity", unit: "m/s²" }
        ],
        calculate: (vals) => {
          const {T,L,g}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oT=T,oL=L,oG=g,steps="";
          if(T===undefined){oT=2*Math.PI*Math.sqrt(L/g);steps=`T = 2π√(L/g) = 2π√(${L}/${g}) = ${oT.toFixed(4)} s`;}
          else if(L===undefined){oL=g*Math.pow(T/(2*Math.PI),2);steps=`L = g(T/2π)² = ${g}×(${T}/2π)² = ${oL.toFixed(4)} m`;}
          else if(g===undefined){oG=L*Math.pow(2*Math.PI/T,2);steps=`g = L(2π/T)² = ${L}×(2π/${T})² = ${oG.toFixed(4)} m/s²`;}
          const freq=1/oT;
          const omega=2*Math.PI/oT;
          return{result:`T = ${oT.toFixed(4)} s | f = ${freq.toFixed(4)} Hz\nL = ${oL.toFixed(4)} m | g = ${oG.toFixed(4)} m/s²\nω = ${omega.toFixed(4)} rad/s`,steps:steps+`\nω = 2π/T = ${omega.toFixed(4)} rad/s\nf = 1/T = ${freq.toFixed(4)} Hz`};
        }
      },
      {
        id: "conical-pendulum", name: "Conical Pendulum",
        description: "T=2π√(Lcosθ/g). Solves for period, length, angle, or gravity. Computes tension and speed.",
        equation: "T = 2π√(Lcosθ/g)",
        variables: [
          { id: "T", label: "Period", unit: "s" },
          { id: "L", label: "String Length", unit: "m" },
          { id: "theta", label: "Angle from Vertical", unit: "°" },
          { id: "g", label: "Gravity", unit: "m/s²" }
        ],
        calculate: (vals) => {
          const {T,L,theta,g}=vals;
          const deg2rad=d=>d*Math.PI/180;
          const rad2deg=r=>r*180/Math.PI;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oT=T,oL=L,oTheta=theta,oG=g,steps="";
          if(T===undefined){const th=deg2rad(theta);oT=2*Math.PI*Math.sqrt(L*Math.cos(th)/g);steps=`T = 2π√(Lcosθ/g) = 2π√(${L}×cos(${theta}°)/${g}) = ${oT.toFixed(4)} s`;}
          else if(L===undefined){const th=deg2rad(theta);oL=g*Math.pow(oT!==T?oT:T/(2*Math.PI),2)/Math.cos(th);oL=g*Math.pow(T/(2*Math.PI),2)/Math.cos(th);steps=`L = g(T/2π)²/cosθ = ${g}×(${T}/2π)²/cos(${theta}°) = ${oL.toFixed(4)} m`;}
          else if(theta===undefined){const cosVal=g*Math.pow(T/(2*Math.PI),2)/L;if(Math.abs(cosVal)>1)return{result:"Error: No valid angle (cos > 1).",steps:"Check inputs."};oTheta=rad2deg(Math.acos(cosVal));steps=`cosθ = g(T/2π)²/L = ${cosVal.toFixed(4)}\nθ = arccos(${cosVal.toFixed(4)}) = ${oTheta.toFixed(2)}°`;}
          else if(g===undefined){const th=deg2rad(theta);oG=L*Math.cos(th)*Math.pow(2*Math.PI/T,2);steps=`g = Lcosθ(2π/T)² = ${L}×cos(${theta}°)×(2π/${T})² = ${oG.toFixed(4)} m/s²`;}
          const thRad=deg2rad(oTheta);
          const r=oL*Math.sin(thRad);
          const v=2*Math.PI*r/(oT!==undefined?oT:T);
          const actualT=oT||T;
          const speed=2*Math.PI*r/actualT;
          return{result:`T = ${oT.toFixed(4)} s | L = ${oL.toFixed(4)} m\nθ = ${oTheta.toFixed(2)}° | g = ${oG.toFixed(4)} m/s²\nRadius = ${r.toFixed(4)} m | Speed = ${speed.toFixed(4)} m/s`,steps:steps+`\nRadius r = Lsinθ = ${r.toFixed(4)} m\nSpeed v = 2πr/T = ${speed.toFixed(4)} m/s`};
        }
      },
      {
        id: "banked-curve", name: "Banked Curve (No Friction)",
        description: "v=√(rg·tanθ). Solves for optimal speed, radius, angle, or gravity for a banked turn.",
        equation: "v = √(rg × tan(θ))",
        variables: [
          { id: "v", label: "Optimal Speed", unit: "m/s" },
          { id: "r", label: "Curve Radius", unit: "m" },
          { id: "theta", label: "Bank Angle", unit: "°" },
          { id: "g", label: "Gravity", unit: "m/s²" }
        ],
        calculate: (vals) => {
          const {v,r,theta,g}=vals;
          const deg2rad=d=>d*Math.PI/180;
          const rad2deg=r=>r*180/Math.PI;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oV=v,oR=r,oTheta=theta,oG=g,steps="";
          if(v===undefined){const th=deg2rad(theta);oV=Math.sqrt(r*g*Math.tan(th));steps=`v = √(rg·tanθ) = √(${r}×${g}×tan(${theta}°)) = ${oV.toFixed(4)} m/s`;}
          else if(r===undefined){const th=deg2rad(theta);oR=v*v/(g*Math.tan(th));steps=`r = v²/(g·tanθ) = ${v}²/(${g}×tan(${theta}°)) = ${oR.toFixed(4)} m`;}
          else if(theta===undefined){const tanVal=v*v/(r*g);oTheta=rad2deg(Math.atan(tanVal));steps=`tanθ = v²/(rg) = ${v*v}/(${r}×${g}) = ${tanVal.toFixed(4)}\nθ = arctan(${tanVal.toFixed(4)}) = ${oTheta.toFixed(2)}°`;}
          else if(g===undefined){const th=deg2rad(theta);oG=v*v/(r*Math.tan(th));steps=`g = v²/(r·tanθ) = ${v}²/(${r}×tan(${theta}°)) = ${oG.toFixed(4)} m/s²`;}
          const kmh=oV*3.6;
          const centAcc=oV*oV/oR;
          return{result:`v = ${oV.toFixed(4)} m/s (${kmh.toFixed(2)} km/h)\nr = ${oR.toFixed(4)} m | θ = ${oTheta.toFixed(2)}°\ng = ${oG.toFixed(4)} m/s² | a_c = ${centAcc.toFixed(4)} m/s²`,steps};
        }
      },
      {
        id: "moment-of-inertia", name: "Moment of Inertia",
        description: "I=kmr² for common shapes. Computes I for solid cylinder, sphere, rod, ring, and hollow sphere.",
        equation: "I = kmr² (k depends on shape)",
        variables: [
          { id: "I", label: "Moment of Inertia", unit: "kg·m²" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "r", label: "Radius / Length", unit: "m" },
          { id: "k", label: "Shape Factor (k)", unit: "" }
        ],
        calculate: (vals) => {
          const {I,m,r,k}=vals;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oI=I,om=m,or=r,ok=k,steps="";
          if(I===undefined){oI=k*m*r*r;steps=`I = kmr² = ${k}×${m}×${r}² = ${oI.toFixed(4)} kg·m²`;}
          else if(m===undefined){om=I/(k*r*r);steps=`m = I/(kr²) = ${I}/(${k}×${r}²) = ${om.toFixed(4)} kg`;}
          else if(r===undefined){or=Math.sqrt(I/(k*m));steps=`r = √(I/(km)) = √(${I}/(${k}×${m})) = ${or.toFixed(4)} m`;}
          else if(k===undefined){ok=I/(m*r*r);steps=`k = I/(mr²) = ${I}/(${m}×${r}²) = ${ok.toFixed(4)}`;}
          const shapes={"0.5":"Solid Cylinder / Disc","0.4":"Solid Sphere","0.333":"Thin Rod (center)","0.0833":"Thin Rod (end) → actually 1/12","1.0":"Thin Ring / Hoop","0.667":"Hollow Sphere"};
          let shapeInfo="";
          for(const[factor,name] of Object.entries(shapes)){if(Math.abs(ok-parseFloat(factor))<0.05){shapeInfo=`\nShape: ${name}`;break;}}
          return{result:`I = ${oI.toFixed(4)} kg·m²\nm = ${om.toFixed(4)} kg | r = ${or.toFixed(4)} m\nk = ${ok.toFixed(4)}${shapeInfo}`,steps:steps+`\nCommon k values: 0.5=cylinder, 0.4=solid sphere, 1.0=ring, 0.667=hollow sphere`};
        }
      },
      {
        id: "terminal-velocity", name: "Terminal Velocity",
        description: "vt=√(2mg/(ρACd)). Solves for terminal velocity, mass, drag coefficient, area, or air density.",
        equation: "v_t = √(2mg / (ρAC_d))",
        variables: [
          { id: "vt", label: "Terminal Velocity", unit: "m/s" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "rho", label: "Fluid Density", unit: "kg/m³" },
          { id: "A", label: "Cross-section Area", unit: "m²" },
          { id: "Cd", label: "Drag Coefficient", unit: "" }
        ],
        calculate: (vals) => {
          const {vt,m,rho,A,Cd}=vals;
          const g=9.81;
          const known=Object.keys(vals).length;
          if(known<4) return{result:"Need at least 4 of 5 variables.",steps:"Provide 4 values."};
          let oVt=vt,om=m,oRho=rho,oA=A,oCd=Cd,steps="";
          if(vt===undefined){oVt=Math.sqrt(2*m*g/(rho*A*Cd));steps=`vt = √(2mg/(ρACd)) = √(2×${m}×${g}/(${rho}×${A}×${Cd})) = ${oVt.toFixed(4)} m/s`;}
          else if(m===undefined){om=vt*vt*rho*A*Cd/(2*g);steps=`m = vt²ρACd/(2g) = ${vt}²×${rho}×${A}×${Cd}/(2×${g}) = ${om.toFixed(4)} kg`;}
          else if(rho===undefined){oRho=2*m*g/(vt*vt*A*Cd);steps:`ρ = 2mg/(vt²ACd) = 2×${m}×${g}/(${vt}²×${A}×${Cd}) = ${oRho.toFixed(4)} kg/m³`;}
          else if(A===undefined){oA=2*m*g/(vt*vt*rho*Cd);steps=`A = 2mg/(vt²ρCd) = 2×${m}×${g}/(${vt}²×${rho}×${Cd}) = ${oA.toFixed(4)} m²`;}
          else if(Cd===undefined){oCd=2*m*g/(vt*vt*rho*A);steps=`Cd = 2mg/(vt²ρA) = 2×${m}×${g}/(${vt}²×${rho}×${A}) = ${oCd.toFixed(4)}`;}
          const Fd=0.5*oRho*oVt*oVt*oCd*oA;
          const kmh=oVt*3.6;
          return{result:`vt = ${oVt.toFixed(4)} m/s (${kmh.toFixed(2)} km/h)\nm = ${om.toFixed(4)} kg | ρ = ${oRho.toFixed(4)} kg/m³\nA = ${oA.toFixed(4)} m² | Cd = ${oCd.toFixed(4)}\nDrag at terminal = ${Fd.toFixed(4)} N (= Weight)`,steps};
        }
      },
      {
        id: "drag-force", name: "Drag Force",
        description: "Fd=½ρv²CdA. Solves for drag force, fluid density, velocity, drag coefficient, or area.",
        equation: "F_d = ½ρv²C_dA",
        variables: [
          { id: "Fd", label: "Drag Force", unit: "N" },
          { id: "rho", label: "Fluid Density", unit: "kg/m³" },
          { id: "v", label: "Velocity", unit: "m/s" },
          { id: "Cd", label: "Drag Coefficient", unit: "" },
          { id: "A", label: "Cross-section Area", unit: "m²" }
        ],
        calculate: (vals) => {
          const {Fd,rho,v,Cd,A}=vals;
          const known=Object.keys(vals).length;
          if(known<4) return{result:"Need at least 4 of 5 variables.",steps:"Provide 4 values."};
          let oFd=Fd,oRho=rho,oV=v,oCd=Cd,oA=A,steps="";
          if(Fd===undefined){oFd=0.5*rho*v*v*Cd*A;steps=`Fd = ½ρv²CdA = ½×${rho}×${v}²×${Cd}×${A} = ${oFd.toFixed(4)} N`;}
          else if(rho===undefined){oRho=2*Fd/(v*v*Cd*A);steps:`ρ = 2Fd/(v²CdA) = 2×${Fd}/(${v}²×${Cd}×${A}) = ${oRho.toFixed(4)} kg/m³`;}
          else if(v===undefined){oV=Math.sqrt(2*Fd/(rho*Cd*A));steps:`v = √(2Fd/(ρCdA)) = √(2×${Fd}/(${rho}×${Cd}×${A})) = ${oV.toFixed(4)} m/s`;}
          else if(Cd===undefined){oCd=2*Fd/(rho*v*v*A);steps:`Cd = 2Fd/(ρv²A) = 2×${Fd}/(${rho}×${v}²×${A}) = ${oCd.toFixed(4)}`;}
          else if(A===undefined){oA=2*Fd/(rho*v*v*Cd);steps:`A = 2Fd/(ρv²Cd) = 2×${Fd}/(${rho}×${v}²×${Cd}) = ${oA.toFixed(4)} m²`;}
          const Re=oRho*oV*1.0/0.001;
          const power=oFd*oV;
          return{result:`Fd = ${oFd.toFixed(4)} N | ρ = ${oRho.toFixed(4)} kg/m³\nv = ${oV.toFixed(4)} m/s | Cd = ${oCd.toFixed(4)}\nA = ${oA.toFixed(4)} m² | Power = Fd×v = ${power.toFixed(4)} W`,steps};
        }
      }
    ]
  },
  {
    category: "Electromagnetic Theory",
    icon: "Zap",
    formulas: [
      {
        id: "magnetic-force-charge", name: "Magnetic Force on Charge",
        description: "F=qvBsinθ. Solves for force, charge, velocity, field, or angle. Computes cyclotron radius.",
        equation: "F = qvB sin(θ)",
        variables: [
          { id: "F", label: "Force", unit: "N" },
          { id: "q", label: "Charge", unit: "C" },
          { id: "v", label: "Velocity", unit: "m/s" },
          { id: "B", label: "Magnetic Field", unit: "T" },
          { id: "theta", label: "Angle (v to B)", unit: "°" }
        ],
        calculate: (vals) => {
          const {F,q,v,B,theta}=vals;
          const d2r=d=>d*Math.PI/180, r2d=r=>r*180/Math.PI;
          const known=Object.keys(vals).length;
          if(known<4) return{result:"Need at least 4 of 5 variables.",steps:"Provide 4 values."};
          let oF=F,oq=q,ov=v,oB=B,oTh=theta,steps="";
          if(F===undefined){oF=q*v*B*Math.sin(d2r(theta));steps=`F = qvBsinθ = ${q}×${v}×${B}×sin(${theta}°) = ${oF.toFixed(4)} N`;}
          else if(q===undefined){oq=F/(v*B*Math.sin(d2r(theta)));steps=`q = F/(vBsinθ) = ${F}/(${v}×${B}×sin(${theta}°)) = ${oq.toFixed(4)} C`;}
          else if(v===undefined){ov=F/(q*B*Math.sin(d2r(theta)));steps=`v = F/(qBsinθ) = ${F}/(${q}×${B}×sin(${theta}°)) = ${ov.toFixed(4)} m/s`;}
          else if(B===undefined){oB=F/(q*v*Math.sin(d2r(theta)));steps:`B = F/(qvsinθ) = ${F}/(${q}×${v}×sin(${theta}°)) = ${oB.toFixed(4)} T`;}
          else if(theta===undefined){const sv=F/(q*v*B);if(Math.abs(sv)>1)return{result:"Error: |F/(qvB)| > 1",steps:"No valid angle."};oTh=r2d(Math.asin(sv));steps:`sinθ = F/(qvB) = ${sv.toFixed(4)}\nθ = ${oTh.toFixed(2)}°`;}
          const r=oq*ov*Math.sin(d2r(oTh))/(oB*9.81)||0;
          const cyclotronR=oq*ov/(oB)||0;
          return{result:`F = ${oF.toFixed(4)} N | q = ${oq.toExponential(4)} C\nv = ${ov.toFixed(4)} m/s | B = ${oB.toFixed(4)} T\nθ = ${oTh.toFixed(2)}° | Cyclotron r = ${cyclotronR.toFixed(4)} m`,steps:steps+`\nCyclotron radius r = mv/(qB) (if perpendicular)`};
        }
      },
      {
        id: "amperes-law", name: "Ampere's Law (Solenoid)",
        description: "B=μ₀nI. Solves for magnetic field, turn density, or current inside a solenoid.",
        equation: "B = μ₀nI",
        variables: [
          { id: "B", label: "Magnetic Field", unit: "T" },
          { id: "n", label: "Turns per meter (n)", unit: "1/m" },
          { id: "I", label: "Current", unit: "A" }
        ],
        calculate: (vals) => {
          const mu0=4*Math.PI*1e-7;
          const {B,n,I}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oB=B,on=n,oI=I,steps="";
          if(B===undefined){oB=mu0*n*I;steps=`B = μ₀nI = ${mu0.toExponential(4)}×${n}×${I} = ${oB.toExponential(4)} T`;}
          else if(n===undefined){on=B/(mu0*I);steps=`n = B/(μ₀I) = ${B}/(${mu0.toExponential(4)}×${I}) = ${on.toFixed(2)} turns/m`;}
          else if(I===undefined){oI=B/(mu0*n);steps=`I = B/(μ₀n) = ${B}/(${mu0.toExponential(4)}×${n}) = ${oI.toFixed(4)} A`;}
          const flux=oB*Math.PI*0.01*0.01;
          return{result:`B = ${oB.toExponential(4)} T (${oB.toFixed(6)} T)\nn = ${on.toFixed(2)} turns/m | I = ${oI.toFixed(4)} A\nFlux per cm² = ${flux.toExponential(4)} Wb`,steps};
        }
      },
      {
        id: "faraday-law", name: "Faraday's Law of Induction",
        description: "EMF=NBAωsin(ωt). Solves for EMF, turns, field, area, angular velocity, or time.",
        equation: "EMF = NBAω sin(ωt)",
        variables: [
          { id: "emf", label: "Induced EMF", unit: "V" },
          { id: "N", label: "Number of Turns", unit: "" },
          { id: "B", label: "Magnetic Field", unit: "T" },
          { id: "A", label: "Loop Area", unit: "m²" },
          { id: "omega", label: "Angular Velocity", unit: "rad/s" },
          { id: "t", label: "Time", unit: "s" }
        ],
        calculate: (vals) => {
          const {emf,N,B,A,omega,t}=vals;
          const known=Object.keys(vals).length;
          if(known<5) return{result:"Need at least 5 of 6 variables.",steps:"Provide 5 values."};
          let oEmf=emf,oN=N,oB=B,oA=A,oOmega=omega,oT=t,steps="";
          const sinwt=Math.sin(omega*t);
          if(emf===undefined){oEmf=N*B*A*omega*sinwt;steps=`EMF = NBAωsin(ωt) = ${N}×${B}×${A}×${omega}×sin(${omega}×${t}) = ${oEmf.toFixed(4)} V`;}
          else if(N===undefined){oN=emf/(B*A*omega*sinwt);steps=`N = EMF/(BAωsin(ωt)) = ${oN.toFixed(2)} turns`;}
          else if(B===undefined){oB=emf/(N*A*omega*sinwt);steps:`B = EMF/(NAωsin(ωt)) = ${oB.toFixed(4)} T`;}
          else if(A===undefined){oA=emf/(N*B*omega*sinwt);steps:`A = EMF/(NBωsin(ωt)) = ${oA.toFixed(4)} m²`;}
          else if(omega===undefined){const sinArg=emf/(N*B*A);if(Math.abs(sinArg)>1)return{result:"Error: Cannot solve for ω directly.",steps:"EMF/(NBA) > 1, no valid solution."};oOmega=Math.asin(sinArg)/t;steps:`ω = arcsin(EMF/(NBA))/t = ${oOmega.toFixed(4)} rad/s`;}
          else if(t===undefined){const sinArg=emf/(N*B*A*omega);if(Math.abs(sinArg)>1)return{result:"Error: Cannot solve for t directly.",steps:"No valid time."};oT=Math.asin(sinArg)/omega;steps:`t = arcsin(EMF/(NBAω))/ω = ${oT.toFixed(4)} s`;}
          const peakEmf=oN*oB*oA*oOmega;
          const freq=oOmega/(2*Math.PI);
          return{result:`EMF = ${oEmf.toFixed(4)} V (instantaneous)\nPeak EMF = ${peakEmf.toFixed(4)} V | f = ${freq.toFixed(4)} Hz\nN = ${oN.toFixed(0)} | B = ${oB.toFixed(4)} T | A = ${oA.toFixed(4)} m²`,steps};
        }
      },
      {
        id: "hall-effect", name: "Hall Effect",
        description: "VH=IB/(nqd). Solves for Hall voltage, current, field, carrier density, or thickness.",
        equation: "V_H = IB / (nqd)",
        variables: [
          { id: "VH", label: "Hall Voltage", unit: "V" },
          { id: "I", label: "Current", unit: "A" },
          { id: "B", label: "Magnetic Field", unit: "T" },
          { id: "n", label: "Carrier Density (n)", unit: "1/m³" },
          { id: "d", label: "Conductor Thickness", unit: "m" }
        ],
        calculate: (vals) => {
          const e=1.6e-19;
          const {VH,I,B,n,d}=vals;
          const known=Object.keys(vals).length;
          if(known<4) return{result:"Need at least 4 of 5 variables.",steps:"Provide 4 values."};
          let oVH=VH,oI=I,oB=B,on=n,od=d,steps="";
          if(VH===undefined){oVH=I*B/(n*e*d);steps:`VH = IB/(nqd) = ${I}×${B}/(${n.toExponential(2)}×${e}×${d}) = ${oVH.toExponential(4)} V`;}
          else if(I===undefined){oI=VH*n*e*d/B;steps:`I = VHnqd/B = ${oI.toFixed(4)} A`;}
          else if(B===undefined){oB=I*n*e*d/VH;steps:`B = Inqd/VH = ${oB.toFixed(4)} T`;}
          else if(n===undefined){on=I*B/(VH*e*d);steps:`n = IB/(VHqd) = ${on.toExponential(4)} /m³`;}
          else if(d===undefined){od=I*B/(VH*n*e);steps:`d = IB/(VHnq) = ${od.toExponential(4)} m`;}
          return{result:`VH = ${oVH.toExponential(4)} V | I = ${oI.toFixed(4)} A\nB = ${oB.toFixed(4)} T | n = ${on.toExponential(4)} /m³\nd = ${od.toExponential(4)} m`,steps};
        }
      },
      {
        id: "lc-resonance", name: "LC Resonance",
        description: "f=1/(2π√(LC)). Solves for resonant frequency, inductance, or capacitance.",
        equation: "f = 1 / (2π√(LC))",
        variables: [
          { id: "f", label: "Resonant Frequency", unit: "Hz" },
          { id: "L", label: "Inductance", unit: "H" },
          { id: "C", label: "Capacitance", unit: "F" }
        ],
        calculate: (vals) => {
          const {f,L,C}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oF=f,oL=L,oC=C,steps="";
          if(f===undefined){oF=1/(2*Math.PI*Math.sqrt(L*C));steps:`f = 1/(2π√(LC)) = 1/(2π√(${L}×${C})) = ${oF.toFixed(4)} Hz`;}
          else if(L===undefined){oL=1/(4*Math.PI*Math.PI*f*f*C);steps:`L = 1/(4π²f²C) = 1/(4π²×${f}²×${C}) = ${oL.toExponential(4)} H`;}
          else if(C===undefined){oC=1/(4*Math.PI*Math.PI*f*f*L);steps:`C = 1/(4π²f²L) = 1/(4π²×${f}²×${L}) = ${oC.toExponential(4)} F`;}
          const omega=2*Math.PI*oF;
          const XL=omega*oL;
          const XC=1/(omega*oC);
          const period=1/oF;
          return{result:`f = ${oF.toFixed(4)} Hz (${(oF/1000).toFixed(2)} kHz)\nL = ${oL.toExponential(4)} H | C = ${oC.toExponential(4)} F\nXL = XC = ${XL.toFixed(4)} Ω | T = ${period.toExponential(4)} s\nω = ${omega.toFixed(4)} rad/s`,steps};
        }
      },
      {
        id: "magnetic-force-wire", name: "Magnetic Force on Wire",
        description: "F=BILsinθ. Solves for force, field, current, length, or angle between wire and field.",
        equation: "F = BIL sin(θ)",
        variables: [
          { id: "F", label: "Force", unit: "N" },
          { id: "B", label: "Magnetic Field", unit: "T" },
          { id: "I", label: "Current", unit: "A" },
          { id: "L", label: "Wire Length", unit: "m" },
          { id: "theta", label: "Angle (wire to B)", unit: "°" }
        ],
        calculate: (vals) => {
          const {F,B,I,L,theta}=vals;
          const d2r=d=>d*Math.PI/180,r2d=r=>r*180/Math.PI;
          const known=Object.keys(vals).length;
          if(known<4) return{result:"Need at least 4 of 5 variables.",steps:"Provide 4 values."};
          let oF=F,oB=B,oI=I,oL=L,oTh=theta,steps="";
          if(F===undefined){oF=B*I*L*Math.sin(d2r(theta));steps:`F = BILsinθ = ${B}×${I}×${L}×sin(${theta}°) = ${oF.toFixed(4)} N`;}
          else if(B===undefined){oB=F/(I*L*Math.sin(d2r(theta)));steps:`B = F/(ILsinθ) = ${oB.toFixed(4)} T`;}
          else if(I===undefined){oI=F/(B*L*Math.sin(d2r(theta)));steps:`I = F/(BLsinθ) = ${oI.toFixed(4)} A`;}
          else if(L===undefined){oL=F/(B*I*Math.sin(d2r(theta)));steps:`L = F/(BIsinθ) = ${oL.toFixed(4)} m`;}
          else if(theta===undefined){const sv=F/(B*I*L);if(Math.abs(sv)>1)return{result:"Error: |F/(BIL)| > 1",steps:"No valid angle."};oTh=r2d(Math.asin(sv));steps:`θ = arcsin(${sv.toFixed(4)}) = ${oTh.toFixed(2)}°`;}
          return{result:`F = ${oF.toFixed(4)} N | B = ${oB.toFixed(4)} T\nI = ${oI.toFixed(4)} A | L = ${oL.toFixed(4)} m\nθ = ${oTh.toFixed(2)}°`,steps};
        }
      },
      {
        id: "wheatstone-bridge", name: "Wheatstone Bridge",
        description: "Solves balanced/unbalanced Wheatstone bridge. Finds output voltage or unknown resistance.",
        equation: "V_out = V_s(R₂/(R₁+R₂) − R₄/(R₃+R₄))",
        variables: [
          { id: "Vs", label: "Source Voltage", unit: "V" },
          { id: "R1", label: "R₁", unit: "Ω" },
          { id: "R2", label: "R₂", unit: "Ω" },
          { id: "R3", label: "R₃", unit: "Ω" },
          { id: "R4", label: "R₄", unit: "Ω" }
        ],
        calculate: (vals) => {
          const {Vs,R1,R2,R3,R4}=vals;
          if(Vs===undefined||R1===undefined||R2===undefined||R3===undefined||R4===undefined)
            return{result:"Need all 5 values for Wheatstone bridge.",steps:"Provide Vs, R1-R4."};
          const v1=Vs*R2/(R1+R2);
          const v2=Vs*R4/(R3+R4);
          const vOut=v1-v2;
          const balanced=Math.abs(vOut)<1e-10;
          const i1=Vs/(R1+R2);
          const i2=Vs/(R3+R4);
          const rBal=R2*R3/R1;
          return{result:`V_out = ${vOut.toFixed(6)} V\n${balanced?"✅ Bridge is BALANCED":"⚠️ Bridge is UNBALANCED"}\nV_R2 = ${v1.toFixed(4)} V | V_R4 = ${v2.toFixed(4)} V\nI₁ = ${i1.toExponential(4)} A | I₂ = ${i2.toExponential(4)} A\nBalance requires R4 = R2R3/R1 = ${rBal.toFixed(2)} Ω`,steps:`V_R2 = Vs×R2/(R1+R2) = ${v1.toFixed(4)} V\nV_R4 = Vs×R4/(R3+R4) = ${v2.toFixed(4)} V\nV_out = V_R2 − V_R4 = ${vOut.toFixed(6)} V\nFor balance: R1×R4 = R2×R3`};
        }
      },
      {
        id: "kirchhoff-junction", name: "Kirchhoff's Junction Rule",
        description: "ΣI = 0 at a junction. Given any 2 of 3 currents, finds the third.",
        equation: "I₁ + I₂ + I₃ = 0",
        variables: [
          { id: "I1", label: "Current 1 (in=+, out=−)", unit: "A" },
          { id: "I2", label: "Current 2 (in=+, out=−)", unit: "A" },
          { id: "I3", label: "Current 3 (in=+, out=−)", unit: "A" }
        ],
        calculate: (vals) => {
          const {I1,I2,I3}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 currents.",steps:"Convention: into junction = +, out = −"};
          let oI1=I1,oI2=I2,oI3=I3,steps="";
          if(I3===undefined){oI3=-(I1+I2);steps=`I₃ = −(I₁+I₂) = −(${I1}+${I2}) = ${oI3.toFixed(4)} A`;}
          else if(I2===undefined){oI2=-(I1+I3);steps=`I₂ = −(I₁+I₃) = −(${I1}+${I3}) = ${oI2.toFixed(4)} A`;}
          else if(I1===undefined){oI1=-(I2+I3);steps:`I₁ = −(I₂+I₃) = −(${I2}+${I3}) = ${oI1.toFixed(4)} A`;}
          const sum=oI1+oI2+oI3;
          return{result:`I₁ = ${oI1.toFixed(4)} A | I₂ = ${oI2.toFixed(4)} A | I₃ = ${oI3.toFixed(4)} A\nΣI = ${sum.toFixed(6)} A ${Math.abs(sum)<1e-10?"✅ Verified":"⚠️ Check signs"}\n(Remember: into junction = positive, out = negative)`,steps};
        }
      },
      {
        id: "inductor-energy", name: "Inductor Energy Storage",
        description: "E=½LI². Solves for stored energy, inductance, or current.",
        equation: "E = ½LI²",
        variables: [
          { id: "E", label: "Stored Energy", unit: "J" },
          { id: "L", label: "Inductance", unit: "H" },
          { id: "I", label: "Current", unit: "A" }
        ],
        calculate: (vals) => {
          const {E,L,I}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oE=E,oL=L,oI=I,steps="";
          if(E===undefined){oE=0.5*L*I*I;steps:`E = ½LI² = ½×${L}×${I}² = ${oE.toFixed(4)} J`;}
          else if(L===undefined){oL=2*E/(I*I);steps:`L = 2E/I² = 2×${E}/${I}² = ${oL.toFixed(4)} H`;}
          else if(I===undefined){oI=Math.sqrt(2*E/L);steps:`I = √(2E/L) = √(2×${E}/${L}) = ${oI.toFixed(4)} A`;}
          const flux=oL*oI;
          return{result:`E = ${oE.toFixed(4)} J | L = ${oL.toExponential(4)} H\nI = ${oI.toFixed(4)} A | Magnetic flux = LI = ${flux.toExponential(4)} Wb`,steps};
        }
      },
      {
        id: "magnetic-flux", name: "Magnetic Flux",
        description: "Φ=B·A·cosθ. Solves for flux, field, area, or angle. Detects max/min flux conditions.",
        equation: "Φ = BA cos(θ)",
        variables: [
          { id: "phi", label: "Magnetic Flux", unit: "Wb" },
          { id: "B", label: "Magnetic Field", unit: "T" },
          { id: "A", label: "Area", unit: "m²" },
          { id: "theta", label: "Angle (B to normal)", unit: "°" }
        ],
        calculate: (vals) => {
          const {phi,B,A,theta}=vals;
          const d2r=d=>d*Math.PI/180,r2d=r=>r*180/Math.PI;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oPhi=phi,oB=B,oA=A,oTh=theta,steps="";
          if(phi===undefined){oPhi=B*A*Math.cos(d2r(theta));steps:`Φ = BAcosθ = ${B}×${A}×cos(${theta}°) = ${oPhi.toExponential(4)} Wb`;}
          else if(B===undefined){oB=phi/(A*Math.cos(d2r(theta)));steps:`B = Φ/(Acosθ) = ${oB.toFixed(4)} T`;}
          else if(A===undefined){oA=phi/(B*Math.cos(d2r(theta)));steps:`A = Φ/(Bcosθ) = ${oA.toFixed(4)} m²`;}
          else if(theta===undefined){const cv=phi/(B*A);if(Math.abs(cv)>1)return{result:"Error: |Φ/(BA)| > 1",steps:"No valid angle."};oTh=r2d(Math.acos(cv));steps:`θ = arccos(${cv.toFixed(4)}) = ${oTh.toFixed(2)}°`;}
          const maxFlux=oB*oA;
          const isMax=Math.abs(oTh%360)<1||Math.abs(oTh%360-360)<1;
          const isZero=Math.abs(Math.abs(oTh%360)-90)<1;
          return{result:`Φ = ${oPhi.toExponential(4)} Wb\nB = ${oB.toFixed(4)} T | A = ${oA.toFixed(4)} m²\nθ = ${oTh.toFixed(2)}° | Max flux = ${maxFlux.toExponential(4)} Wb\n${isMax?"✅ Maximum flux (θ=0°)":isZero?"⚠️ Zero flux (θ=90°)":""}`,steps};
        }
      }
    ]
  },
  {
    category: "Orbital & Space Physics",
    icon: "Atom",
    formulas: [
      {
        id: "escape-velocity", name: "Escape Velocity",
        description: "ve=√(2GM/r). Solves for escape velocity, mass, or radius.",
        equation: "v_e = √(2GM/r)",
        variables: [
          { id: "ve", label: "Escape Velocity", unit: "m/s" },
          { id: "M", label: "Planet Mass", unit: "kg" },
          { id: "r", label: "Radius (from center)", unit: "m" }
        ],
        calculate: (vals) => {
          const G=6.674e-11;
          const {ve,M,r}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oVe=ve,oM=M,oR=r,steps="";
          if(ve===undefined){oVe=Math.sqrt(2*G*M/r);steps:`ve = √(2GM/r) = √(2×${G}×${M}/${r}) = ${oVe.toFixed(2)} m/s`;}
          else if(M===undefined){oM=ve*ve*r/(2*G);steps:`M = ve²r/(2G) = ${oM.toExponential(4)} kg`;}
          else if(r===undefined){oR=2*G*M/(ve*ve);steps:`r = 2GM/ve² = ${oR.toExponential(4)} m`;}
          const kmh=oVe*3.6;
          const orbitalV=oVe/Math.sqrt(2);
          return{result:`ve = ${oVe.toFixed(2)} m/s (${kmh.toFixed(2)} km/h)\nM = ${oM.toExponential(4)} kg | r = ${oR.toExponential(4)} m\nOrbital velocity = ve/√2 = ${orbitalV.toFixed(2)} m/s`,steps};
        }
      },
      {
        id: "orbital-period", name: "Orbital Period",
        description: "T=2π√(r³/(GM)). Solves for period, orbital radius, or central mass.",
        equation: "T = 2π√(r³/(GM))",
        variables: [
          { id: "T", label: "Orbital Period", unit: "s" },
          { id: "r", label: "Orbital Radius", unit: "m" },
          { id: "M", label: "Central Mass", unit: "kg" }
        ],
        calculate: (vals) => {
          const G=6.674e-11;
          const {T,r,M}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oT=T,oR=r,oM=M,steps="";
          if(T===undefined){oT=2*Math.PI*Math.sqrt(r*r*r/(G*M));steps:`T = 2π√(r³/(GM)) = ${oT.toFixed(2)} s (${(oT/3600).toFixed(2)} hr)`;}
          else if(r===undefined){oR=Math.pow(G*M*Math.pow(T/(2*Math.PI),2),1/3);steps:`r = (GMT²/(4π²))^(1/3) = ${oR.toExponential(4)} m`;}
          else if(M===undefined){oM=4*Math.PI*Math.PI*r*r*r/(G*T*T);steps:`M = 4π²r³/(GT²) = ${oM.toExponential(4)} kg`;}
          const v=2*Math.PI*oR/oT;
          const altitude=oR-6.371e6;
          return{result:`T = ${oT.toFixed(2)} s (${(oT/3600).toFixed(2)} hr, ${(oT/86400).toFixed(4)} days)\nr = ${oR.toExponential(4)} m (${(oR/1000).toFixed(2)} km)\nM = ${oM.toExponential(4)} kg | v = ${v.toFixed(2)} m/s\nAltitude ≈ ${(altitude/1000).toFixed(2)} km (if Earth)`,steps};
        }
      },
      {
        id: "schwarzschild-radius", name: "Schwarzschild Radius",
        description: "rs=2GM/c². Solves for black hole radius or mass.",
        equation: "r_s = 2GM/c²",
        variables: [
          { id: "rs", label: "Schwarzschild Radius", unit: "m" },
          { id: "M", label: "Black Hole Mass", unit: "kg" }
        ],
        calculate: (vals) => {
          const G=6.674e-11, c=3e8;
          const {rs,M}=vals;
          if(rs===undefined&&M===undefined) return{result:"Need either rs or M.",steps:"Provide 1 value."};
          let oRs=rs,oM=M,steps="";
          if(rs===undefined){oRs=2*G*M/(c*c);steps:`rs = 2GM/c² = 2×${G}×${M}/${c*c} = ${oRs.toExponential(4)} m`;}
          else if(M===undefined){oM=rs*c*c/(2*G);steps:`M = rs×c²/(2G) = ${oM.toExponential(4)} kg`;}
          const solarMasses=oM/1.989e30;
          const earthMasses=oM/5.972e24;
          return{result:`rs = ${oRs.toExponential(4)} m (${(oRs/1000).toFixed(2)} km)\nM = ${oM.toExponential(4)} kg\n= ${solarMasses.toFixed(4)} solar masses\n= ${earthMasses.toFixed(2)} Earth masses`,steps};
        }
      },
      {
        id: "hubble-law", name: "Hubble's Law",
        description: "v=H₀d. Solves for recession velocity, Hubble constant, or distance.",
        equation: "v = H₀ × d",
        variables: [
          { id: "v", label: "Recession Velocity", unit: "km/s" },
          { id: "H0", label: "Hubble Constant (H₀)", unit: "km/(s·Mpc)" },
          { id: "d", label: "Distance", unit: "Mpc" }
        ],
        calculate: (vals) => {
          const {v,H0,d}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oV=v,oH0=H0,oD=d,steps="";
          if(v===undefined){oV=H0*d;steps:`v = H₀d = ${H0}×${d} = ${oV.toFixed(2)} km/s`;}
          else if(H0===undefined){oH0=v/d;steps:`H₀ = v/d = ${v}/${d} = ${oH0.toFixed(2)} km/s/Mpc`;}
          else if(d===undefined){oD=v/H0;steps:`d = v/H₀ = ${v}/${H0} = ${oD.toFixed(4)} Mpc`;}
          const redshift=oV/3e5;
          const ly=oD*3.26e6;
          const age=1/oH0*3.086e19/3.156e7;
          return{result:`v = ${oV.toFixed(2)} km/s | H₀ = ${oH0.toFixed(2)} km/s/Mpc\nd = ${oD.toFixed(4)} Mpc (${(ly/1e6).toFixed(2)} Mly)\nRedshift z ≈ ${redshift.toFixed(6)}\nHubble time ≈ ${age.toFixed(2)} billion years`,steps};
        }
      },
      {
        id: "kepler-third", name: "Kepler's Third Law",
        description: "T²=(4π²/GM)a³. Solves for period, semi-major axis, or central mass.",
        equation: "T² = (4π²/GM) × a³",
        variables: [
          { id: "T", label: "Period", unit: "s" },
          { id: "a", label: "Semi-major Axis", unit: "m" },
          { id: "M", label: "Central Mass", unit: "kg" }
        ],
        calculate: (vals) => {
          const G=6.674e-11;
          const {T,a,M}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oT=T,oA=a,oM=M,steps="";
          if(T===undefined){oT=2*Math.PI*Math.sqrt(oA*Math.pow(oA||a,2)/(G*M));oT=2*Math.PI*Math.sqrt(a*a*a/(G*M));steps:`T = 2π√(a³/(GM)) = ${oT.toFixed(2)} s`;}
          else if(a===undefined){oA=Math.pow(G*M*T*T/(4*Math.PI*Math.PI),1/3);steps:`a = (GMT²/(4π²))^(1/3) = ${oA.toExponential(4)} m`;}
          else if(M===undefined){oM=4*Math.PI*Math.PI*a*a*a/(G*T*T);steps:`M = 4π²a³/(GT²) = ${oM.toExponential(4)} kg`;}
          const au=oA/1.496e11;
          const years=oT/3.156e7;
          return{result:`T = ${oT.toExponential(4)} s (${years.toFixed(4)} years)\na = ${oA.toExponential(4)} m (${au.toFixed(4)} AU)\nM = ${oM.toExponential(4)} kg`,steps};
        }
      },
      {
        id: "orbital-velocity", name: "Orbital Velocity",
        description: "v=√(GM/r). Solves for orbital speed, mass, or radius.",
        equation: "v = √(GM/r)",
        variables: [
          { id: "v", label: "Orbital Velocity", unit: "m/s" },
          { id: "M", label: "Central Mass", unit: "kg" },
          { id: "r", label: "Orbital Radius", unit: "m" }
        ],
        calculate: (vals) => {
          const G=6.674e-11;
          const {v,M,r}=vals;
          const known=Object.keys(vals).length;
          if(known<2) return{result:"Need at least 2 of 3 variables.",steps:"Provide 2 values."};
          let oV=v,oM=M,oR=r,steps="";
          if(v===undefined){oV=Math.sqrt(G*M/r);steps:`v = √(GM/r) = ${oV.toFixed(2)} m/s`;}
          else if(M===undefined){oM=v*v*r/G;steps:`M = v²r/G = ${oM.toExponential(4)} kg`;}
          else if(r===undefined){oR=G*M/(v*v);steps:`r = GM/v² = ${oR.toExponential(4)} m`;}
          const period=2*Math.PI*oR/oV;
          const KE=0.5*oV*oV;
          return{result:`v = ${oV.toFixed(2)} m/s (${(oV*3.6).toFixed(2)} km/h)\nM = ${oM.toExponential(4)} kg | r = ${oR.toExponential(4)} m\nPeriod = ${period.toFixed(2)} s (${(period/3600).toFixed(2)} hr)\nSpecific KE = ½v² = ${KE.toFixed(2)} J/kg`,steps};
        }
      },
      {
        id: "gravitational-pe", name: "Gravitational Potential Energy",
        description: "U=-GMm/r. Solves for PE, either mass, or distance. Computes binding energy.",
        equation: "U = -GMm/r",
        variables: [
          { id: "U", label: "Gravitational PE", unit: "J" },
          { id: "M", label: "Mass 1 (larger)", unit: "kg" },
          { id: "m", label: "Mass 2 (smaller)", unit: "kg" },
          { id: "r", label: "Distance between centers", unit: "m" }
        ],
        calculate: (vals) => {
          const G=6.674e-11;
          const {U,M,m,r}=vals;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oU=U,oM=M,om=m,oR=r,steps="";
          if(U===undefined){oU=-G*M*m/r;steps:`U = -GMm/r = -${G}×${M}×${m}/${r} = ${oU.toExponential(4)} J`;}
          else if(M===undefined){oM=-U*r/(G*m);steps:`M = -Ur/(Gm) = ${oM.toExponential(4)} kg`;}
          else if(m===undefined){om=-U*r/(G*M);steps:`m = -Ur/(GM) = ${om.toExponential(4)} kg`;}
          else if(r===undefined){oR=-G*M*om/U;steps:`r = -GMm/U = ${oR.toExponential(4)} m`;}
          const F=G*oM*om/(oR*oR);
          const binding=Math.abs(oU);
          return{result:`U = ${oU.toExponential(4)} J\nM = ${oM.toExponential(4)} kg | m = ${om.toExponential(4)} kg\nr = ${oR.toExponential(4)} m | F = ${F.toExponential(4)} N\nBinding energy = ${binding.toExponential(4)} J`,steps};
        }
      },
      {
        id: "vis-viva", name: "Vis-Viva Equation",
        description: "v²=GM(2/r-1/a). Solves for velocity, mass, distance, or semi-major axis.",
        equation: "v² = GM(2/r - 1/a)",
        variables: [
          { id: "v", label: "Velocity at distance r", unit: "m/s" },
          { id: "M", label: "Central Mass", unit: "kg" },
          { id: "r", label: "Current Distance", unit: "m" },
          { id: "a", label: "Semi-major Axis", unit: "m" }
        ],
        calculate: (vals) => {
          const G=6.674e-11;
          const {v,M,r,a}=vals;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oV=v,oM=M,oR=r,oA=a,steps="";
          if(v===undefined){const val=G*M*(2/r-1/a);if(val<0)return{result:"Error: r > 2a gives negative v²",steps:"Invalid orbit parameters."};oV=Math.sqrt(val);steps:`v = √(GM(2/r-1/a)) = ${oV.toFixed(2)} m/s`;}
          else if(M===undefined){oM=v*v/(G*(2/r-1/a));steps:`M = v²/(G(2/r-1/a)) = ${oM.toExponential(4)} kg`;}
          else if(r===undefined){const term=v*v/(G*M)+1/a;oR=2/term;steps:`r = 2/(v²/(GM)+1/a) = ${oR.toExponential(4)} m`;}
          else if(a===undefined){const val=2/r-v*v/(G*M);if(val<=0)return{result:"Error: Hyperbolic orbit (a ≤ 0)",steps:"The orbit is unbound."};oA=1/val;steps:`a = 1/(2/r-v²/(GM)) = ${oA.toExponential(4)} m`;}
          const period=2*Math.PI*Math.sqrt(oA*oA*oA/(G*oM));
          const ecc=oR<oA?Math.sqrt(1-oR/oA):0;
          return{result:`v = ${oV.toFixed(2)} m/s | M = ${oM.toExponential(4)} kg\nr = ${oR.toExponential(4)} m | a = ${oA.toExponential(4)} m\nPeriod ≈ ${period.toExponential(4)} s`,steps};
        }
      },
      {
        id: "roche-limit", name: "Roche Limit",
        description: "d=R(2ρM/ρm)^(1/3). Solves for Roche limit, primary radius, or density ratio.",
        equation: "d = R(2ρ_M/ρ_m)^(1/3)",
        variables: [
          { id: "d", label: "Roche Limit", unit: "m" },
          { id: "R", label: "Primary Body Radius", unit: "m" },
          { id: "rhoM", label: "Primary Density (ρ_M)", unit: "kg/m³" },
          { id: "rhom", label: "Satellite Density (ρ_m)", unit: "kg/m³" }
        ],
        calculate: (vals) => {
          const {d,R,rhoM,rhom}=vals;
          const known=Object.keys(vals).length;
          if(known<3) return{result:"Need at least 3 of 4 variables.",steps:"Provide 3 values."};
          let oD=d,oR=R,oRhoM=rhoM,oRhom=rhom,steps="";
          if(d===undefined){oD=R*Math.cbrt(2*rhoM/rhom);steps:`d = R(2ρM/ρm)^(1/3) = ${R}×(2×${rhoM}/${rhom})^(1/3) = ${oD.toExponential(4)} m`;}
          else if(R===undefined){oR=d/Math.cbrt(2*rhoM/rhom);steps:`R = d/(2ρM/ρm)^(1/3) = ${oR.toExponential(4)} m`;}
          else if(rhoM===undefined){oRhoM=rhom*Math.pow(d/R,3)/2;steps:`ρM = ρm(d/R)³/2 = ${oRhoM.toFixed(4)} kg/m³`;}
          else if(rhom===undefined){oRhom=2*rhoM*Math.pow(oR/d,3);steps:`ρm = 2ρM(R/d)³ = ${oRhom.toFixed(4)} kg/m³`;}
          const ratio=oD/oR;
          return{result:`Roche limit = ${oD.toExponential(4)} m (${(oD/1000).toFixed(2)} km)\nR = ${oR.toExponential(4)} m | ρM = ${oRhoM.toFixed(2)} kg/m³\nρm = ${oRhom.toFixed(2)} kg/m³ | d/R = ${ratio.toFixed(4)}`,steps};
        }
      },
      {
        id: "tidal-force", name: "Tidal Force",
        description: "ΔF≈2GMmR/r³. Solves for tidal force, primary mass, satellite mass, radius, or distance.",
        equation: "ΔF = 2GMmR/r³",
        variables: [
          { id: "dF", label: "Tidal Force", unit: "N" },
          { id: "M", label: "Primary Mass", unit: "kg" },
          { id: "m", label: "Satellite Mass", unit: "kg" },
          { id: "R", label: "Satellite Radius", unit: "m" },
          { id: "r", label: "Distance (center to center)", unit: "m" }
        ],
        calculate: (vals) => {
          const G=6.674e-11;
          const {dF,M,m,R,r}=vals;
          const known=Object.keys(vals).length;
          if(known<4) return{result:"Need at least 4 of 5 variables.",steps:"Provide 4 values."};
          let oDF=dF,oM=M,om=m,oR=R,or=r,steps="";
          if(dF===undefined){oDF=2*G*M*m*R/(r*r*r);steps:`ΔF = 2GMmR/r³ = ${oDF.toExponential(4)} N`;}
          else if(M===undefined){oM=dF*r*r*r/(2*G*m*R);steps:`M = ΔFr³/(2GmR) = ${oM.toExponential(4)} kg`;}
          else if(m===undefined){om=dF*r*r*r/(2*G*M*R);steps:`m = ΔFr³/(2GMR) = ${om.toExponential(4)} kg`;}
          else if(R===undefined){oR=dF*r*r*r/(2*G*M*m);steps:`R = ΔFr³/(2GMm) = ${oR.toExponential(4)} m`;}
          else if(r===undefined){or=Math.cbrt(2*G*M*m*oR/dF);steps:`r = (2GMmR/ΔF)^(1/3) = ${or.toExponential(4)} m`;}
          return{result:`ΔF = ${oDF.toExponential(4)} N\nM = ${oM.toExponential(4)} kg | m = ${om.toExponential(4)} kg\nR = ${oR.toExponential(4)} m | r = ${or.toExponential(4)} m`,steps};
        }
      }
    ]
  },
  {
    category: "Algebra & Pre-Calculus",
    icon: "Calculator",
    formulas: [
      {
        id: "midpoint", name: "Midpoint Formula (2D)",
        description: "M=((x₁+x₂)/2, (y₁+y₂)/2). Solves for midpoint or any coordinate.",
        equation: "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
        variables: [
          { id: "mx", label: "Midpoint X", unit: "" },
          { id: "my", label: "Midpoint Y", unit: "" },
          { id: "x1", label: "Point 1 X (x₁)", unit: "" },
          { id: "y1", label: "Point 1 Y (y₁)", unit: "" },
          { id: "x2", label: "Point 2 X (x₂)", unit: "" },
          { id: "y2", label: "Point 2 Y (y₂)", unit: "" }
        ],
        calculate: (vals) => {
          const {mx,my,x1,y1,x2,y2}=vals;
          const k=Object.keys(vals).length;
          if(k<5)return{result:"Need at least 5 of 6.",steps:"Provide 5 values."};
          let oMx=mx,oMy=my,oX1=x1,oY1=y1,oX2=x2,oY2=y2,s="";
          if(mx===undefined){oMx=(x1+x2)/2;s=`mx = (x₁+x₂)/2 = (${x1}+${x2})/2 = ${oMx.toFixed(4)}`;}
          else if(x1===undefined){oX1=2*mx-x2;s=`x₁ = 2mx−x₂ = ${oX1.toFixed(4)}`;}
          else if(x2===undefined){oX2=2*mx-x1;s=`x₂ = 2mx−x₁ = ${oX2.toFixed(4)}`;}
          if(my===undefined){oMy=(y1+y2)/2;s+=`\nmy = (y₁+y₂)/2 = (${y1}+${y2})/2 = ${oMy.toFixed(4)}`;}
          else if(y1===undefined){oY1=2*my-y2;s+=`\ny₁ = 2my−y₂ = ${oY1.toFixed(4)}`;}
          else if(y2===undefined){oY2=2*my-y1;s+=`\ny₂ = 2my−y₁ = ${oY2.toFixed(4)}`;}
          return{result:`Midpoint = (${oMx.toFixed(4)}, ${oMy.toFixed(4)})\nP1 = (${oX1.toFixed(4)}, ${oY1.toFixed(4)}) | P2 = (${oX2.toFixed(4)}, ${oY2.toFixed(4)})`,steps:s};
        }
      },
      {
        id: "slope-line", name: "Slope of a Line",
        description: "m=(y₂-y₁)/(x₂-x₁). Solves for slope or any coordinate.",
        equation: "m = (y₂ − y₁) / (x₂ − x₁)",
        variables: [
          { id: "m", label: "Slope (m)", unit: "" },
          { id: "x1", label: "x₁", unit: "" },
          { id: "y1", label: "y₁", unit: "" },
          { id: "x2", label: "x₂", unit: "" },
          { id: "y2", label: "y₂", unit: "" }
        ],
        calculate: (vals) => {
          const {m,x1,y1,x2,y2}=vals;
          const k=Object.keys(vals).length;
          if(k<4)return{result:"Need at least 4 of 5.",steps:"Provide 4 values."};
          let oM=m,oX1=x1,oY1=y1,oX2=x2,oY2=y2,s="";
          if(m===undefined){if(x2===x1)return{result:"Error: Vertical line (undefined slope)",steps:"x₁ = x₂"};oM=(y2-y1)/(x2-x1);s=`m = (${y2}−${y1})/(${x2}−${x1}) = ${oM.toFixed(4)}`;}
          else if(y2===undefined){oY2=y1+m*(x2-x1);s=`y₂ = y₁+m(x₂−x₁) = ${oY2.toFixed(4)}`;}
          else if(y1===undefined){oY1=y2-m*(x2-x1);s=`y₁ = y₂−m(x₂−x₁) = ${oY1.toFixed(4)}`;}
          else if(x2===undefined){if(m===0)return{result:"Error: m=0, x₂ cannot be determined from y.",steps:"Horizontal line."};oX2=x1+(y2-y1)/m;s=`x₂ = x₁+(y₂−y₁)/m = ${oX2.toFixed(4)}`;}
          else if(x1===undefined){if(m===0)return{result:"Error: m=0, x₁ cannot be determined from y.",steps:"Horizontal line."};oX1=x2-(y2-y1)/m;s=`x₁ = x₂−(y₂−y₁)/m = ${oX1.toFixed(4)}`;}
          const angle=Math.atan(oM)*180/Math.PI;
          return{result:`Slope m = ${oM.toFixed(4)}\nAngle = ${angle.toFixed(2)}°\n${Math.abs(oM)<0.001?"Horizontal line":Math.abs(oM)>1000?"Vertical line":oM>0?"Positive slope (rising)":"Negative slope (falling)"}`,steps:s};
        }
      },
      {
        id: "arithmetic-sequence", name: "Arithmetic Sequence & Series",
        description: "aₙ=a₁+(n-1)d, Sₙ=n(a₁+aₙ)/2. Solves for any term, difference, sum, or n.",
        equation: "aₙ = a₁ + (n−1)d,  Sₙ = n(a₁+aₙ)/2",
        variables: [
          { id: "a1", label: "First Term (a₁)", unit: "" },
          { id: "d", label: "Common Difference (d)", unit: "" },
          { id: "n", label: "Term Number (n)", unit: "" },
          { id: "an", label: "nth Term (aₙ)", unit: "" }
        ],
        calculate: (vals) => {
          const {a1,d,n,an}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oA1=a1,oD=d,oN=n,oAn=an,s="";
          if(an===undefined){oAn=a1+(n-1)*d;s=`aₙ = a₁+(n−1)d = ${a1}+(${n}−1)×${d} = ${oAn.toFixed(4)}`;}
          else if(a1===undefined){oA1=an-(n-1)*d;s=`a₁ = aₙ−(n−1)d = ${oA1.toFixed(4)}`;}
          else if(d===undefined){oD=(an-a1)/(n-1);s=`d = (aₙ−a₁)/(n−1) = ${oD.toFixed(4)}`;}
          else if(n===undefined){oN=(an-a1)/d+1;if(oN!==Math.floor(oN)||oN<1)return{result:"Error: n is not a positive integer.",steps:`n = ${oN}`};s=`n = (aₙ−a₁)/d+1 = ${oN}`;}
          const sum=oN*(oA1+oAn)/2;
          return{result:`a₁ = ${oA1.toFixed(4)} | d = ${oD.toFixed(4)}\naₙ = ${oAn.toFixed(4)} (term #${oN})\nSₙ = n(a₁+aₙ)/2 = ${sum.toFixed(4)}`,steps:s+`\nSum of first ${oN} terms = ${sum.toFixed(4)}`};
        }
      },
      {
        id: "geometric-sequence", name: "Geometric Sequence & Series",
        description: "aₙ=a₁r^(n-1), Sₙ=a₁(1-rⁿ)/(1-r). Solves for any term, ratio, sum, or n.",
        equation: "aₙ = a₁r^(n−1),  Sₙ = a₁(1−rⁿ)/(1−r)",
        variables: [
          { id: "a1", label: "First Term (a₁)", unit: "" },
          { id: "r", label: "Common Ratio (r)", unit: "" },
          { id: "n", label: "Term Number (n)", unit: "" },
          { id: "an", label: "nth Term (aₙ)", unit: "" }
        ],
        calculate: (vals) => {
          const {a1,r,n,an}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oA1=a1,oR=r,oN=n,oAn=an,s="";
          if(an===undefined){oAn=a1*Math.pow(r,n-1);s=`aₙ = ${a1}×${r}^(${n}−1) = ${oAn.toFixed(4)}`;}
          else if(a1===undefined){oA1=an/Math.pow(r,n-1);s=`a₁ = aₙ/r^(n−1) = ${oA1.toFixed(4)}`;}
          else if(r===undefined){oR=Math.pow(an/a1,1/(n-1));s=`r = (aₙ/a₁)^(1/(n−1)) = ${oR.toFixed(4)}`;}
          else if(n===undefined){const val=an/a1;if(val<=0)return{result:"Error: Can't solve for n.",steps:"aₙ/a₁ must be positive."};if(r<=0||r===1)return{result:"Error: Invalid base r for log.",steps:"r must be > 0 and r ≠ 1."};oN=Math.log(val)/Math.log(r)+1;s=`n = log(aₙ/a₁)/log(r)+1 = ${oN.toFixed(4)}`;}
          let sum;
          if(Math.abs(oR-1)<1e-10){sum=oN*oA1;}else{sum=oA1*(1-Math.pow(oR,oN))/(1-oR);}
          const infSum=Math.abs(oR)<1?oA1/(1-oR):null;
          return{result:`a₁ = ${oA1.toFixed(4)} | r = ${oR.toFixed(4)}\naₙ = ${oAn.toFixed(4)} (term #${oN.toFixed(0)})\nSₙ = ${sum.toFixed(4)}${infSum!==null?`\nS∞ = a₁/(1−r) = ${infSum.toFixed(4)} (converges)`:"\n|r|≥1: series diverges"}`,steps:s};
        }
      },
      {
        id: "simple-interest", name: "Simple Interest",
        description: "A=P(1+rt). Solves for amount, principal, rate, or time.",
        equation: "A = P(1 + rt)",
        variables: [
          { id: "A", label: "Final Amount", unit: "$" },
          { id: "P", label: "Principal", unit: "$" },
          { id: "r", label: "Annual Rate (decimal)", unit: "" },
          { id: "t", label: "Time (years)", unit: "years" }
        ],
        calculate: (vals) => {
          const {A,P,r,t}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oA=A,oP=P,oR=r,oT=t,s="";
          if(A===undefined){oA=P*(1+r*t);s=`A = P(1+rt) = ${P}×(1+${r}×${t}) = ${oA.toFixed(2)}`;}
          else if(P===undefined){oP=A/(1+r*t);s=`P = A/(1+rt) = ${oP.toFixed(2)}`;}
          else if(r===undefined){oR=(A/P-1)/t;s=`r = (A/P−1)/t = ${(oR*100).toFixed(4)}%`;}
          else if(t===undefined){oT=(A/P-1)/r;s=`t = (A/P−1)/r = ${oT.toFixed(4)} years`;}
          const interest=oA-oP;
          return{result:`A = $${oA.toFixed(2)} | P = $${oP.toFixed(2)}\nr = ${(oR*100).toFixed(4)}% | t = ${oT.toFixed(4)} years\nInterest = $${interest.toFixed(2)}`,steps:s};
        }
      },
      {
        id: "continuous-compound", name: "Continuously Compounded Interest",
        description: "A=Pe^(rt). Solves for amount, principal, rate, or time.",
        equation: "A = Pe^(rt)",
        variables: [
          { id: "A", label: "Final Amount", unit: "$" },
          { id: "P", label: "Principal", unit: "$" },
          { id: "r", label: "Annual Rate (decimal)", unit: "" },
          { id: "t", label: "Time (years)", unit: "years" }
        ],
        calculate: (vals) => {
          const {A,P,r,t}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oA=A,oP=P,oR=r,oT=t,s="";
          if(A===undefined){oA=P*Math.exp(r*t);s=`A = Pe^(rt) = ${P}×e^(${r}×${t}) = ${oA.toFixed(2)}`;}
          else if(P===undefined){oP=A/Math.exp(r*t);s=`P = A/e^(rt) = ${oP.toFixed(2)}`;}
          else if(r===undefined){const ratio=A/P;if(ratio<=0)return{result:"Error: A/P must be positive for ln().",steps:"A and P must have the same sign and A≠0."};oR=Math.log(ratio)/t;s=`r = ln(A/P)/t = ${(oR*100).toFixed(4)}%`;}
          else if(t===undefined){const ratio=A/P;if(ratio<=0)return{result:"Error: A/P must be positive for ln().",steps:"A and P must have the same sign and A≠0."};oT=Math.log(ratio)/r;s=`t = ln(A/P)/r = ${oT.toFixed(4)} years`;}
          const interest=oA-oP;
          const doubleTime=oR?Math.log(2)/oR:Infinity;
          return{result:`A = $${oA.toFixed(2)} | P = $${oP.toFixed(2)}\nr = ${(oR*100).toFixed(4)}% | t = ${oT.toFixed(4)} years\nInterest = $${interest.toFixed(2)} | Doubling time = ${doubleTime.toFixed(2)} yr`,steps:s};
        }
      },
      {
        id: "matrix-2x2", name: "Matrix 2×2 (Det & Inverse)",
        description: "Computes determinant, trace, and inverse of a 2×2 matrix from all four elements.",
        equation: "det(A) = ad − bc",
        variables: [
          { id: "a", label: "Element a (top-left)", unit: "" },
          { id: "b", label: "Element b (top-right)", unit: "" },
          { id: "c", label: "Element c (bottom-left)", unit: "" },
          { id: "d", label: "Element d (bottom-right)", unit: "" }
        ],
        calculate: (vals) => {
          const {a,b,c,d}=vals;
          if(a===undefined||b===undefined||c===undefined||d===undefined)
            return{result:"Need all 4 elements.",steps:"Enter a, b, c, d."};
          const det=a*d-b*c;
          let inv="";
          if(Math.abs(det)<1e-10){inv="\nMatrix is SINGULAR (no inverse exists)";}
          else{const ia=d/det,ib=-b/det,ic=-c/det,id=a/det;inv=`\nInverse = [${ia.toFixed(4)}, ${ib.toFixed(4)}; ${ic.toFixed(4)}, ${id.toFixed(4)}]`;}
          const trace=a+d;
          const eigenDisc=trace*trace-4*det;
          return{result:`Matrix = [${a}, ${b}; ${c}, ${d}]\ndet = ${det.toFixed(4)}\ntrace = ${trace.toFixed(4)}${inv}`,steps:`det(A) = ad−bc = ${a}×${d} − ${b}×${c} = ${det.toFixed(4)}\nTrace = a+d = ${trace.toFixed(4)}`};
        }
      },
      {
        id: "vector-ops", name: "Vector Operations (2D/3D)",
        description: "Dot product, cross product, magnitude, and angle between vectors.",
        equation: "A·B = a₁b₁+a₂b₂+a₃b₃",
        variables: [
          { id: "ax", label: "Vector A x", unit: "" },
          { id: "ay", label: "Vector A y", unit: "" },
          { id: "bx", label: "Vector B x", unit: "" },
          { id: "by", label: "Vector B y", unit: "" }
        ],
        calculate: (vals) => {
          const {ax,ay,bx,by}=vals;
          if(ax===undefined||ay===undefined||bx===undefined||by===undefined)
            return{result:"Need all 4 components.",steps:"Enter ax, ay, bx, by."};
          const dot=ax*bx+ay*by;
          const magA=Math.sqrt(ax*ax+ay*ay);
          const magB=Math.sqrt(bx*bx+by*by);
          const cross=ax*by-ay*bx;
          const angle=magA>0&&magB>0?Math.acos(Math.min(1,Math.max(-1,dot/(magA*magB))))*180/Math.PI:0;
          const projScalar=magA>0?dot/(magA*magA):0;
          return{result:`Dot product = ${dot.toFixed(4)}\n|A| = ${magA.toFixed(4)} | |B| = ${magB.toFixed(4)}\nCross product (z) = ${cross.toFixed(4)}\nAngle = ${angle.toFixed(2)}°\nProjection of B onto A = (${(projScalar*ax).toFixed(4)}, ${(projScalar*ay).toFixed(4)})`,steps:`A·B = ${ax}×${bx} + ${ay}×${by} = ${dot.toFixed(4)}\n|A| = ${magA.toFixed(4)}, |B| = ${magB.toFixed(4)}\nθ = arccos(A·B/(|A||B|)) = ${angle.toFixed(2)}°`};
        }
      },
      {
        id: "exponential-growth", name: "Exponential Growth/Decay",
        description: "N=N₀e^(kt). Solves for final amount, initial, rate, or time.",
        equation: "N = N₀ × e^(kt)",
        variables: [
          { id: "N", label: "Final Amount (N)", unit: "" },
          { id: "N0", label: "Initial Amount (N₀)", unit: "" },
          { id: "k", label: "Growth Rate (k)", unit: "" },
          { id: "t", label: "Time", unit: "" }
        ],
        calculate: (vals) => {
          const {N,N0,k,t}=vals;
          const kn=Object.keys(vals).length;
          if(kn<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oN=N,oN0=N0,oK=k,oT=t,s="";
          if(N===undefined){oN=N0*Math.exp(k*t);s=`N = N₀e^(kt) = ${N0}×e^(${k}×${t}) = ${oN.toFixed(4)}`;}
          else if(N0===undefined){oN0=N/Math.exp(k*t);s=`N₀ = N/e^(kt) = ${oN0.toFixed(4)}`;}
          else if(k===undefined){const ratio=N/N0;if(ratio<=0)return{result:"Error: N/N₀ must be positive for ln().",steps:"N and N₀ must have the same sign and N≠0."};oK=Math.log(ratio)/t;s=`k = ln(N/N₀)/t = ${oK.toFixed(6)}`;}
          else if(t===undefined){const ratio=N/N0;if(ratio<=0)return{result:"Error: N/N₀ must be positive for ln().",steps:"N and N₀ must have the same sign and N≠0."};oT=Math.log(ratio)/k;s=`t = ln(N/N₀)/k = ${oT.toFixed(4)}`;}
          const halfLife=oK?Math.log(2)/Math.abs(oK):Infinity;
          const doubling=oK>0?Math.log(2)/oK:Infinity;
          return{result:`N = ${oN.toFixed(4)} | N₀ = ${oN0.toFixed(4)}\nk = ${oK.toFixed(6)} ${oK>0?"(growth)":"(decay)"} | t = ${oT.toFixed(4)}\nHalf-life = ${halfLife.toFixed(4)} | Doubling time = ${doubling.toFixed(4)}`,steps:s};
        }
      },
      {
        id: "complex-numbers", name: "Complex Number Operations",
        description: "Computes magnitude, angle (phase), conjugate, and polar form of a complex number.",
        equation: "|z| = √(a² + b²),  θ = atan2(b, a)",
        variables: [
          { id: "a", label: "Real part (a)", unit: "" },
          { id: "b", label: "Imaginary part (b)", unit: "" }
        ],
        calculate: (vals) => {
          const {a,b}=vals;
          if(a===undefined||b===undefined)return{result:"Need both a and b.",steps:"Enter real and imaginary parts."};
          const mag=Math.sqrt(a*a+b*b);
          const angle=Math.atan2(b,a)*180/Math.PI;
          const angleRad=Math.atan2(b,a);
          const conj=`${a} ${b>=0?"+ ":"− "}${Math.abs(b)}i`;
          const square=a*a-b*b;
          const squareIm=2*a*b;
          return{result:`z = ${a} ${b>=0?"+ ":"− "} ${Math.abs(b)}i\n|z| = ${mag.toFixed(4)} | θ = ${angle.toFixed(2)}° (${angleRad.toFixed(4)} rad)\nPolar: ${mag.toFixed(4)}∠${angle.toFixed(2)}°\nConjugate: ${conj}\nz² = ${square.toFixed(4)} ${squareIm>=0?"+ ":"− "} ${Math.abs(squareIm).toFixed(4)}i`,steps:`|z| = √(${a}²+${b}²) = ${mag.toFixed(4)}\nθ = atan2(${b}, ${a}) = ${angle.toFixed(2)}°`};
        }
      }
    ]
  },
  {
    category: "Geometry & Trigonometry",
    icon: "Calculator",
    formulas: [
      {
        id: "circle-sector", name: "Circle Sector & Arc",
        description: "A=½r²θ, L=rθ. Solves for sector area, arc length, radius, or angle.",
        equation: "A = ½r²θ,  L = rθ (θ in radians)",
        variables: [
          { id: "A", label: "Sector Area", unit: "m²" },
          { id: "L", label: "Arc Length", unit: "m" },
          { id: "r", label: "Radius", unit: "m" },
          { id: "theta", label: "Angle", unit: "°" }
        ],
        calculate: (vals) => {
          const d2r=d=>d*Math.PI/180,r2d=r=>r*180/Math.PI;
          const {A,L,r,theta}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 4.",steps:"Provide 2 values."};
          let oA=A,oL=L,oR=r,oTh=theta,s="";
          if(r!==undefined&&theta!==undefined){const th=d2r(theta);oA=0.5*r*r*th;oL=r*th;s=`A = ½r²θ = ${oA.toFixed(4)}\nL = rθ = ${oL.toFixed(4)}`;}
          else if(A!==undefined&&r!==undefined){const th=2*A/(r*r);oTh=r2d(th);oL=r*th;s=`θ = 2A/r² = ${oTh.toFixed(2)}°\nL = rθ = ${oL.toFixed(4)}`;}
          else if(L!==undefined&&r!==undefined){const th=L/r;oTh=r2d(th);oA=0.5*r*th*r;s=`θ = L/r = ${oTh.toFixed(2)}°\nA = ½r²θ = ${oA.toFixed(4)}`;}
          else if(A!==undefined&&theta!==undefined){const th=d2r(theta);oR=Math.sqrt(2*A/th);oL=oR*th;s=`r = √(2A/θ) = ${oR.toFixed(4)}`;}
          else if(L!==undefined&&theta!==undefined){const th=d2r(theta);oR=L/th;oA=0.5*oR*th*oR;s=`r = L/θ = ${oR.toFixed(4)}`;}
          else if(A!==undefined&&L!==undefined){oR=2*A/L;oTh=r2d(L/oR);s=`r = 2A/L = ${oR.toFixed(4)}`;}
          const fullArea=Math.PI*oR*oR;
          const perc=oTh?oTh/360*100:0;
          return{result:`Sector Area = ${oA.toFixed(4)} m² | Arc Length = ${oL.toFixed(4)} m\nRadius = ${oR.toFixed(4)} m | Angle = ${oTh.toFixed(2)}°\nFull circle area = ${fullArea.toFixed(4)} m² | Sector = ${perc.toFixed(1)}% of circle`,steps:s};
        }
      },
      {
        id: "cone", name: "Cone Volume & Surface",
        description: "V=πr²h/3, A=πr(r+√(r²+h²)). Solves for volume, surface, radius, or height.",
        equation: "V = πr²h/3",
        variables: [
          { id: "V", label: "Volume", unit: "m³" },
          { id: "r", label: "Base Radius", unit: "m" },
          { id: "h", label: "Height", unit: "m" }
        ],
        calculate: (vals) => {
          const {V,r,h}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oV=V,oR=r,oH=h,s="";
          if(V===undefined){oV=Math.PI*r*r*h/3;s=`V = πr²h/3 = ${oV.toFixed(4)}`;}
          else if(r===undefined){oR=Math.sqrt(3*V/(Math.PI*h));s=`r = √(3V/(πh)) = ${oR.toFixed(4)}`;}
          else if(h===undefined){oH=3*V/(Math.PI*r*r);s=`h = 3V/(πr²) = ${oH.toFixed(4)}`;}
          const sl=Math.sqrt(oR*oR+oH*oH);
          const latArea=Math.PI*oR*sl;
          const baseArea=Math.PI*oR*oR;
          const totalArea=latArea+baseArea;
          return{result:`V = ${oV.toFixed(4)} m³ | r = ${oR.toFixed(4)} m | h = ${oH.toFixed(4)} m\nSlant height = ${sl.toFixed(4)} m\nLateral area = ${latArea.toFixed(4)} m² | Total area = ${totalArea.toFixed(4)} m²`,steps:s};
        }
      },
      {
        id: "law-of-sines", name: "Law of Sines",
        description: "a/sinA = b/sinB = c/sinC. Solves for any side or angle in any triangle.",
        equation: "a/sin(A) = b/sin(B) = c/sin(C)",
        variables: [
          { id: "a", label: "Side a", unit: "" },
          { id: "A", label: "Angle A (opposite a)", unit: "°" },
          { id: "b", label: "Side b", unit: "" },
          { id: "B", label: "Angle B (opposite b)", unit: "°" }
        ],
        calculate: (vals) => {
          const d2r=d=>d*Math.PI/180,r2d=r=>r*180/Math.PI;
          const {a,A,b,B}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4 (side + opposite angle pair + one more).",steps:"Provide 3 values."};
          let oa=a,oA=A,ob=b,oB=B,s="";
          if(a!==undefined&&A!==undefined&&b!==undefined){oB=r2d(Math.asin(b*Math.sin(d2r(A))/a));s=`B = arcsin(b×sinA/a) = ${oB.toFixed(2)}°`;}
          else if(a!==undefined&&A!==undefined&&B!==undefined){ob=a*Math.sin(d2r(B))/Math.sin(d2r(A));s=`b = a×sinB/sinA = ${ob.toFixed(4)}`;}
          else if(b!==undefined&&B!==undefined&&a!==undefined){oA=r2d(Math.asin(a*Math.sin(d2r(B))/b));s=`A = arcsin(a×sinB/b) = ${oA.toFixed(2)}°`;}
          else if(b!==undefined&&B!==undefined&&A!==undefined){oa=b*Math.sin(d2r(A))/Math.sin(d2r(B));s=`a = b×sinA/sinB = ${oa.toFixed(4)}`;}
          else return{result:"Need a side-angle pair plus one more value.",steps:"E.g. a, A, b or a, A, B"};
          const oC=180-oA-oB;
          if(oC<=0)return{result:"Error: No valid triangle (angles sum exceeds 180°).",steps:"Check inputs."};
          const oc=oa*Math.sin(d2r(oC))/Math.sin(d2r(oA));
          return{result:`a = ${oa.toFixed(4)} | A = ${oA.toFixed(2)}°\nb = ${ob.toFixed(4)} | B = ${oB.toFixed(2)}°\nc = ${oc.toFixed(4)} | C = ${oC.toFixed(2)}°`,steps:s+`\nC = 180°−A−B = ${oC.toFixed(2)}°\nc = a×sinC/sinA = ${oc.toFixed(4)}`};
        }
      },
      {
        id: "double-angle", name: "Double Angle Formulas",
        description: "sin(2θ)=2sinθcosθ, cos(2θ)=cos²θ−sin²θ. Computes all double angle values.",
        equation: "sin(2θ) = 2sinθcosθ",
        variables: [
          { id: "theta", label: "Angle θ", unit: "°" }
        ],
        calculate: (vals) => {
          const {theta}=vals;
          if(theta===undefined)return{result:"Enter angle θ.",steps:"Provide the angle."};
          const r=theta*Math.PI/180;
          const sn=Math.sin(r),cs=Math.cos(r),tn=Math.tan(r);
          const s2=2*sn*cs;
          const c2=cs*cs-sn*sn;
          const t2=Math.abs(cs)<1e-10?Infinity:2*tn/(1-tn*tn);
          return{result:`θ = ${theta}°\nsin(2θ) = ${s2.toFixed(6)}\ncos(2θ) = ${c2.toFixed(6)}\ntan(2θ) = ${t2===Infinity?"undefined":t2.toFixed(6)}\n\nAlso: cos(2θ) = 2cos²θ−1 = ${(2*cs*cs-1).toFixed(6)}\n       cos(2θ) = 1−2sin²θ = ${(1-2*sn*sn).toFixed(6)}`,steps:`sin(${theta}°) = ${sn.toFixed(6)}, cos = ${cs.toFixed(6)}, tan = ${tn.toFixed(6)}\nsin(2×${theta}°) = 2×${sn.toFixed(4)}×${cs.toFixed(4)} = ${s2.toFixed(6)}`};
        }
      },
      {
        id: "point-line-distance", name: "Point to Line Distance",
        description: "d=|Ax₀+By₀+C|/√(A²+B²). Distance from point (x₀,y₀) to line Ax+By+C=0.",
        equation: "d = |Ax₀ + By₀ + C| / √(A² + B²)",
        variables: [
          { id: "A", label: "Coefficient A", unit: "" },
          { id: "B", label: "Coefficient B", unit: "" },
          { id: "C", label: "Coefficient C", unit: "" },
          { id: "x0", label: "Point x₀", unit: "" },
          { id: "y0", label: "Point y₀", unit: "" }
        ],
        calculate: (vals) => {
          const {A,B,C,x0,y0}=vals;
          if(A===undefined||B===undefined||C===undefined||x0===undefined||y0===undefined)
            return{result:"Need all 5 values.",steps:"Enter A, B, C, x₀, y₀."};
          if(A===0&&B===0)return{result:"Error: A and B cannot both be 0.",steps:"Not a valid line."};
          const d=Math.abs(A*x0+B*y0+C)/Math.sqrt(A*A+B*B);
          const foot_x=(B*(B*x0-A*y0)-A*C)/(A*A+B*B);
          const foot_y=(A*(-B*x0+A*y0)-B*C)/(A*A+B*B);
          const slope=B!==0?-A/B:Infinity;
          return{result:`Distance = ${d.toFixed(6)}\nFoot of perpendicular = (${foot_x.toFixed(4)}, ${foot_y.toFixed(4)})\nLine slope = ${slope===Infinity?"undefined":slope.toFixed(4)}`,steps:`d = |${A}×${x0}+${B}×${y0}+${C}|/√(${A}²+${B}²)\n  = |${A*x0+B*y0+C}|/${Math.sqrt(A*A+B*B).toFixed(4)} = ${d.toFixed(6)}`};
        }
      }
    ]
  },
  {
    category: "Calculus Tools",
    icon: "Calculator",
    formulas: [
      {
        id: "derivative-rules", name: "Derivative Evaluator (Power Rule)",
        description: "Computes derivative of axⁿ and evaluates at a point. Also shows slope of tangent.",
        equation: "d/dx[axⁿ] = anxⁿ⁻¹",
        variables: [
          { id: "a", label: "Coefficient (a)", unit: "" },
          { id: "n", label: "Power (n)", unit: "" },
          { id: "x", label: "Evaluate at x", unit: "" }
        ],
        calculate: (vals) => {
          const {a,n,x}=vals;
          if(a===undefined||n===undefined)return{result:"Need a and n.",steps:"Enter coefficient and power."};
          const da=n*a;
          const dn=n-1;
          let derivStr;
          if(dn===0)derivStr=`${da}`;
          else if(dn===1)derivStr=`${da}x`;
          else derivStr=`${da}x^${dn}`;
          let origStr;
          if(n===0)origStr=`${a}`;
          else if(n===1)origStr=`${a}x`;
          else origStr=`${a}x^${n}`;
          let resultStr=`f(x) = ${origStr}\nf'(x) = ${derivStr}`;
          if(x!==undefined){
            const fx=a*Math.pow(x,n);
            const fpx=da*Math.pow(x,dn);
            resultStr+=`\nf(${x}) = ${fx.toFixed(4)}\nf'(${x}) = ${fpx.toFixed(4)} (slope of tangent)`;
          }
          return{result:resultStr,steps:`d/dx[${origStr}] = ${n}×${a}x^(${n}−1) = ${derivStr}`};
        }
      },
      {
        id: "riemann-sum", name: "Riemann Sum Estimator",
        description: "Estimates ∫ₐᵇ x² dx using Left, Right, and Midpoint Riemann sums with n rectangles.",
        equation: "∫ₐᵇ f(x)dx ≈ Σf(xᵢ*)Δx",
        variables: [
          { id: "a", label: "Lower bound (a)", unit: "" },
          { id: "b", label: "Upper bound (b)", unit: "" },
          { id: "n", label: "Number of rectangles", unit: "" }
        ],
        calculate: (vals) => {
          const {a,b,n}=vals;
          if(a===undefined||b===undefined||n===undefined)return{result:"Need a, b, and n.",steps:"Provide all 3 values."};
          if(n<1||!Number.isInteger(n))return{result:"Error: n must be a positive integer.",steps:"Use whole numbers."};
          const dx=(b-a)/n;
          let left=0,right=0,mid=0;
          for(let i=0;i<n;i++){
            const xl=a+i*dx;
            const xr=a+(i+1)*dx;
            const xm=a+(i+0.5)*dx;
            left+=xl*xl*dx;
            right+=xr*xr*dx;
            mid+=xm*xm*dx;
          }
          const exact=(b*b*b-a*a*a)/3;
          return{result:`∫[${a},${b}] x² dx (n=${n}, Δx=${dx.toFixed(4)})\nLeft sum  = ${left.toFixed(6)}\nRight sum = ${right.toFixed(6)}\nMidpoint  = ${mid.toFixed(6)}\nExact     = ${exact.toFixed(6)}\nErrors: L=${Math.abs(exact-left).toExponential(3)}, R=${Math.abs(exact-right).toExponential(3)}, M=${Math.abs(exact-mid).toExponential(3)}`,steps:`Δx = (${b}−${a})/${n} = ${dx.toFixed(4)}\nFunction: f(x) = x²`};
        }
      },
      {
        id: "taylor-series", name: "Taylor Series Approximation",
        description: "Approximates eˣ, sin(x), or cos(x) using Taylor series up to N terms.",
        equation: "f(x) ≈ Σ f⁽ⁿ⁾(a)/n! × (x−a)ⁿ",
        variables: [
          { id: "func", label: "Function (0=eˣ, 1=sin, 2=cos)", unit: "" },
          { id: "x", label: "Evaluate at x", unit: "" },
          { id: "N", label: "Number of terms", unit: "" }
        ],
        calculate: (vals) => {
          const {func,x,N}=vals;
          if(func===undefined||x===undefined||N===undefined)return{result:"Need all 3 values.",steps:"Enter function type, x, and N."};
          const f=Math.round(func),n=Math.round(N);
          if(n<1||n>50)return{result:"Error: N must be 1-50.",steps:"Use reasonable N."};
          let sum=0,name="";
          if(f===0){name="eˣ";for(let i=0;i<n;i++){let fact=1;for(let j=2;j<=i;j++)fact*=j;sum+=Math.pow(x,i)/fact;}}
          else if(f===1){name="sin(x)";for(let i=0;i<n;i++){let fact=1;for(let j=2;j<=2*i+1;j++)fact*=j;sum+=Math.pow(-1,i)*Math.pow(x,2*i+1)/fact;}}
          else if(f===2){name="cos(x)";for(let i=0;i<n;i++){let fact=1;for(let j=2;j<=2*i;j++)fact*=j;sum+=Math.pow(-1,i)*Math.pow(x,2*i)/fact;}}
          else return{result:"Error: func must be 0, 1, or 2.",steps:"0=eˣ, 1=sin, 2=cos"};
          let exact;
          if(f===0)exact=Math.exp(x);else if(f===1)exact=Math.sin(x);else exact=Math.cos(x);
          return{result:`${name} at x=${x} (${n} terms)\nTaylor approx = ${sum.toFixed(8)}\nExact value   = ${exact.toFixed(8)}\nError = ${Math.abs(exact-sum).toExponential(4)}`,steps:`Computed ${n} terms of Taylor series centered at 0.`};
        }
      },
      {
        id: "newton-method", name: "Newton-Raphson Method",
        description: "Finds root of x²−c=0 using Newton-Raphson iteration. Shows convergence step by step.",
        equation: "xₙ₊₁ = xₙ − f(xₙ)/f'(xₙ)",
        variables: [
          { id: "c", label: "Find √c (solve x²−c=0)", unit: "" },
          { id: "x0", label: "Initial guess (x₀)", unit: "" },
          { id: "iters", label: "Iterations", unit: "" }
        ],
        calculate: (vals) => {
          const {c,x0,iters}=vals;
          if(c===undefined||x0===undefined)return{result:"Need c and x₀.",steps:"Enter value and initial guess."};
          const maxIter=Math.min(iters||10,20);
          let x=x0,s=`Finding √${c}\nStarting: x₀ = ${x0}\n`;
          for(let i=0;i<maxIter;i++){
            const fx=x*x-c;
            const fpx=2*x;
            if(Math.abs(fpx)<1e-15)break;
            const xNew=x-fx/fpx;
            s+=`x${i+1} = ${x.toFixed(8)} − (${fx.toFixed(8)})/(${fpx.toFixed(8)}) = ${xNew.toFixed(8)}\n`;
            x=xNew;
            if(Math.abs(fx)<1e-12)break;
          }
          const exact=Math.sqrt(c);
          return{result:`√${c} ≈ ${x.toFixed(10)}\nExact = ${exact.toFixed(10)}\nError = ${Math.abs(exact-x).toExponential(4)}`,steps:s};
        }
      }
    ]
  },
  {
    category: "Probability & Statistics",
    icon: "Calculator",
    formulas: [
      {
        id: "z-score", name: "Z-Score",
        description: "z=(x−μ)/σ. Solves for z-score, value, mean, or standard deviation.",
        equation: "z = (x − μ) / σ",
        variables: [
          { id: "z", label: "Z-Score", unit: "" },
          { id: "x", label: "Value (x)", unit: "" },
          { id: "mu", label: "Mean (μ)", unit: "" },
          { id: "sigma", label: "Std Dev (σ)", unit: "" }
        ],
        calculate: (vals) => {
          const {z,x,mu,sigma}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oZ=z,oX=x,oMu=mu,oSigma=sigma,s="";
          if(z===undefined){oZ=(x-mu)/sigma;s=`z = (${x}−${mu})/${sigma} = ${oZ.toFixed(4)}`;}
          else if(x===undefined){oX=mu+z*sigma;s=`x = μ+zσ = ${oX.toFixed(4)}`;}
          else if(mu===undefined){oMu=x-z*sigma;s=`μ = x−zσ = ${oMu.toFixed(4)}`;}
          else if(sigma===undefined){oSigma=(x-mu)/z;s=`σ = (x−μ)/z = ${oSigma.toFixed(4)}`;}
          return{result:`z = ${oZ.toFixed(4)} | x = ${oX.toFixed(4)}\nμ = ${oMu.toFixed(4)} | σ = ${oSigma.toFixed(4)}\n${oZ>2?"⚠️ Unusual (>2σ)":oZ<-2?"⚠️ Unusual (<−2σ)":"Within 2σ (normal range)"}`,steps:s};
        }
      },
      {
        id: "binomial-prob", name: "Binomial Probability",
        description: "P(X=k) = C(n,k)p^k(1-p)^(n-k). Computes probability of k successes.",
        equation: "P(X=k) = C(n,k) × p^k × (1−p)^(n−k)",
        variables: [
          { id: "n", label: "Trials (n)", unit: "" },
          { id: "k", label: "Successes (k)", unit: "" },
          { id: "p", label: "Probability of success (p)", unit: "" }
        ],
        calculate: (vals) => {
          const {n,k,p}=vals;
          if(n===undefined||k===undefined||p===undefined)return{result:"Need n, k, and p.",steps:"Provide all 3 values."};
          if(p<0||p>1)return{result:"Error: p must be between 0 and 1.",steps:"Probability range [0,1]."};
          if(k>n||k<0||n<0)return{result:"Error: Invalid n or k.",steps:"0 ≤ k ≤ n."};
          const fact=x=>{let f=1;for(let i=2;i<=x;i++)f*=i;return f;};
          const C=fact(n)/(fact(k)*fact(n-k));
          const prob=C*Math.pow(p,k)*Math.pow(1-p,n-k);
          const mean=n*p;
          const variance=n*p*(1-p);
          const stddev=Math.sqrt(variance);
          return{result:`P(X=${k}) = ${prob.toFixed(6)} (${(prob*100).toFixed(4)}%)\nMean = np = ${mean.toFixed(4)}\nVariance = np(1−p) = ${variance.toFixed(4)}\nσ = ${stddev.toFixed(4)}`,steps:`C(${n},${k}) = ${C}\n× ${p}^${k} × ${1-p}^${n-k}\n= ${prob.toFixed(6)}`};
        }
      },
      {
        id: "bayes-theorem", name: "Bayes' Theorem",
        description: "P(A|B)=P(B|A)P(A)/P(B). Solves for any conditional probability.",
        equation: "P(A|B) = P(B|A) × P(A) / P(B)",
        variables: [
          { id: "pAgB", label: "P(A|B)", unit: "" },
          { id: "pBgA", label: "P(B|A)", unit: "" },
          { id: "pA", label: "P(A)", unit: "" },
          { id: "pB", label: "P(B)", unit: "" }
        ],
        calculate: (vals) => {
          const {pAgB,pBgA,pA,pB}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oPAgB=pAgB,oPBgA=pBgA,oPA=pA,oPB=pB,s="";
          if(pAgB===undefined){oPAgB=pBgA*pA/pB;s=`P(A|B) = P(B|A)×P(A)/P(B) = ${pBgA}×${pA}/${pB} = ${oPAgB.toFixed(6)}`;}
          else if(pBgA===undefined){oPBgA=pAgB*pB/pA;s=`P(B|A) = P(A|B)×P(B)/P(A) = ${oPBgA.toFixed(6)}`;}
          else if(pA===undefined){oPA=pAgB*pB/pBgA;s=`P(A) = P(A|B)×P(B)/P(B|A) = ${oPA.toFixed(6)}`;}
          else if(pB===undefined){oPB=pBgA*pA/pAgB;s=`P(B) = P(B|A)×P(A)/P(A|B) = ${oPB.toFixed(6)}`;}
          return{result:`P(A|B) = ${oPAgB.toFixed(6)}\nP(B|A) = ${oPBgA.toFixed(6)}\nP(A) = ${oPA.toFixed(6)} | P(B) = ${oPB.toFixed(6)}`,steps:s};
        }
      },
      {
        id: "confidence-interval", name: "Confidence Interval (Z)",
        description: "CI = x̄ ± z*(σ/√n). Computes confidence interval for population mean.",
        equation: "CI = x̄ ± z*(σ/√n)",
        variables: [
          { id: "xbar", label: "Sample Mean (x̄)", unit: "" },
          { id: "sigma", label: "Population Std Dev (σ)", unit: "" },
          { id: "n", label: "Sample Size (n)", unit: "" },
          { id: "z", label: "Z critical value (e.g. 1.96)", unit: "" }
        ],
        calculate: (vals) => {
          const {xbar,sigma,n,z}=vals;
          if(xbar===undefined||sigma===undefined||n===undefined||z===undefined)
            return{result:"Need all 4 values.",steps:"Enter x̄, σ, n, and z*."};
          if(n<1)return{result:"Error: n must be positive.",steps:"Sample size must be > 0."};
          const se=sigma/Math.sqrt(n);
          const margin=z*se;
          const lower=xbar-margin;
          const upper=xbar+margin;
          return{result:`${xbar} ± ${margin.toFixed(4)}\n95% CI: [${lower.toFixed(4)}, ${upper.toFixed(4)}]\nStandard Error = σ/√n = ${se.toFixed(4)}\nMargin of Error = z*×SE = ${margin.toFixed(4)}`,steps:`SE = ${sigma}/√${n} = ${se.toFixed(4)}\nMargin = ${z}×${se.toFixed(4)} = ${margin.toFixed(4)}`};
        }
      },
      {
        id: "poisson", name: "Poisson Distribution",
        description: "P(X=k) = (λ^k × e^(−λ))/k!. Computes Poisson probability.",
        equation: "P(X=k) = λ^k × e^(−λ) / k!",
        variables: [
          { id: "lambda", label: "Expected rate (λ)", unit: "" },
          { id: "k", label: "Number of events (k)", unit: "" }
        ],
        calculate: (vals) => {
          const {lambda,k}=vals;
          if(lambda===undefined||k===undefined)return{result:"Need λ and k.",steps:"Provide both values."};
          if(lambda<0||k<0||!Number.isInteger(k))return{result:"Error: λ≥0, k must be non-negative integer.",steps:"Check inputs."};
          let fact=1;for(let i=2;i<=k;i++)fact*=i;
          const prob=Math.pow(lambda,k)*Math.exp(-lambda)/fact;
          const mean=lambda;
          const variance=lambda;
          const stddev=Math.sqrt(lambda);
          return{result:`P(X=${k}) = ${prob.toFixed(6)} (${(prob*100).toFixed(4)}%)\nMean = λ = ${mean.toFixed(4)}\nVariance = λ = ${variance.toFixed(4)}\nσ = ${stddev.toFixed(4)}`,steps:`P(X=${k}) = ${lambda}^${k} × e^(−${lambda}) / ${k}!\n= ${Math.pow(lambda,k).toFixed(4)} × ${Math.exp(-lambda).toFixed(6)} / ${fact}\n= ${prob.toFixed(6)}`};
        }
      }
    ]
  },
  {
    category: "Kinematics & Dynamics",
    icon: "Cog",
    formulas: [
      {
        id: "kinematics-v", name: "Kinematics: Velocity-Time",
        description: "v=v₀+at. Solves for final velocity, initial velocity, acceleration, or time.",
        equation: "v = v₀ + at",
        variables: [
          { id: "v", label: "Final Velocity", unit: "m/s" },
          { id: "v0", label: "Initial Velocity", unit: "m/s" },
          { id: "a", label: "Acceleration", unit: "m/s²" },
          { id: "t", label: "Time", unit: "s" }
        ],
        calculate: (vals) => {
          const {v,v0,a,t}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oV=v,oV0=v0,oA=a,oT=t,s="";
          if(v===undefined){oV=v0+a*t;s=`v = v₀+at = ${v0}+${a}×${t} = ${oV.toFixed(4)} m/s`;}
          else if(v0===undefined){oV0=v-a*t;s=`v₀ = v−at = ${oV0.toFixed(4)} m/s`;}
          else if(a===undefined){oA=(v-v0)/t;s=`a = (v−v₀)/t = ${oA.toFixed(4)} m/s²`;}
          else if(t===undefined){oT=(v-v0)/a;if(oT<0)return{result:"Error: Negative time.",steps:"Check inputs."};s=`t = (v−v₀)/a = ${oT.toFixed(4)} s`;}
          const kmh=oV*3.6;
          return{result:`v = ${oV.toFixed(4)} m/s (${kmh.toFixed(2)} km/h)\nv₀ = ${oV0.toFixed(4)} m/s | a = ${oA.toFixed(4)} m/s² | t = ${oT.toFixed(4)} s`,steps:s};
        }
      },
      {
        id: "kinematics-x", name: "Kinematics: Position-Time",
        description: "x=x₀+v₀t+½at². Solves for position, initial velocity, acceleration, or time.",
        equation: "x = x₀ + v₀t + ½at²",
        variables: [
          { id: "x", label: "Final Position", unit: "m" },
          { id: "x0", label: "Initial Position", unit: "m" },
          { id: "v0", label: "Initial Velocity", unit: "m/s" },
          { id: "a", label: "Acceleration", unit: "m/s²" },
          { id: "t", label: "Time", unit: "s" }
        ],
        calculate: (vals) => {
          const {x,x0,v0,a,t}=vals;
          const k=Object.keys(vals).length;
          if(k<4)return{result:"Need at least 4 of 5.",steps:"Provide 4 values."};
          let oX=x,oX0=x0,oV0=v0,oA=a,oT=t,s="";
          if(x===undefined){oX=x0+v0*t+0.5*a*t*t;s=`x = ${x0}+${v0}×${t}+½×${a}×${t}² = ${oX.toFixed(4)} m`;}
          else if(v0===undefined){oV0=(oX-x0-0.5*a*t*t)/t;s=`v₀ = (x−x₀−½at²)/t = ${oV0.toFixed(4)} m/s`;}
          else if(a===undefined){oA=2*(x-x0-v0*t)/(t*t);s=`a = 2(x−x₀−v₀t)/t² = ${oA.toFixed(4)} m/s²`;}
          else if(t===undefined){const disc=v0*v0+2*a*(x-x0);if(disc<0)return{result:"Error: No real solution for t.",steps:"Discriminant < 0."};const t1=(-v0+Math.sqrt(disc))/a;const t2=(-v0-Math.sqrt(disc))/a;oT=t1>0?t1:t2>0?t2:Math.min(t1,t2);s=`t = ${oT.toFixed(4)} s (quadratic solution)`;}
          else if(x0===undefined){oX0=x-v0*t-0.5*a*t*t;s=`x₀ = ${oX0.toFixed(4)} m`;}
          return{result:`x = ${oX.toFixed(4)} m | x₀ = ${oX0.toFixed(4)} m\nv₀ = ${oV0.toFixed(4)} m/s | a = ${oA.toFixed(4)} m/s² | t = ${oT.toFixed(4)} s`,steps:s};
        }
      },
      {
        id: "kinematics-v2", name: "Kinematics: Velocity-Position",
        description: "v²=v₀²+2aΔx. Solves for velocity, initial velocity, acceleration, or displacement.",
        equation: "v² = v₀² + 2aΔx",
        variables: [
          { id: "v", label: "Final Velocity", unit: "m/s" },
          { id: "v0", label: "Initial Velocity", unit: "m/s" },
          { id: "a", label: "Acceleration", unit: "m/s²" },
          { id: "dx", label: "Displacement (Δx)", unit: "m" }
        ],
        calculate: (vals) => {
          const {v,v0,a,dx}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oV=v,oV0=v0,oA=a,oDx=dx,s="";
          if(v===undefined){const val=v0*v0+2*a*dx;if(val<0)return{result:"Error: v² < 0, no real solution.",steps:"Check inputs."};oV=Math.sqrt(val);s=`v = √(${v0}²+2×${a}×${dx}) = ${oV.toFixed(4)} m/s`;}
          else if(v0===undefined){const val=v*v-2*a*dx;if(val<0)return{result:"Error: v₀² < 0.",steps:"Check inputs."};oV0=Math.sqrt(val);s=`v₀ = ${oV0.toFixed(4)} m/s`;}
          else if(a===undefined){oA=(v*v-v0*v0)/(2*dx);s=`a = (v²−v₀²)/(2Δx) = ${oA.toFixed(4)} m/s²`;}
          else if(dx===undefined){oDx=(v*v-v0*v0)/(2*a);s=`Δx = (v²−v₀²)/(2a) = ${oDx.toFixed(4)} m`;}
          return{result:`v = ${oV.toFixed(4)} m/s | v₀ = ${oV0.toFixed(4)} m/s\na = ${oA.toFixed(4)} m/s² | Δx = ${oDx.toFixed(4)} m`,steps:s};
        }
      },
      {
        id: "weight", name: "Weight / Gravitational Force",
        description: "W=mg. Solves for weight, mass, or gravity.",
        equation: "W = mg",
        variables: [
          { id: "W", label: "Weight", unit: "N" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "g", label: "Gravity", unit: "m/s²" }
        ],
        calculate: (vals) => {
          const {W,m,g}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oW=W,om=m,og=g,s="";
          if(W===undefined){oW=m*g;s=`W = mg = ${m}×${g} = ${oW.toFixed(4)} N`;}
          else if(m===undefined){om=W/g;s=`m = W/g = ${om.toFixed(4)} kg`;}
          else if(g===undefined){og=W/m;s=`g = W/m = ${og.toFixed(4)} m/s²`;}
          return{result:`W = ${oW.toFixed(4)} N | m = ${om.toFixed(4)} kg | g = ${og.toFixed(4)} m/s²`,steps:s};
        }
      },
      {
        id: "friction", name: "Friction Forces",
        description: "Static: fs≤μsN, Kinetic: fk=μkN. Computes both friction forces.",
        equation: "f = μN",
        variables: [
          { id: "mu_s", label: "Static Friction Coeff (μs)", unit: "" },
          { id: "mu_k", label: "Kinetic Friction Coeff (μk)", unit: "" },
          { id: "N", label: "Normal Force", unit: "N" }
        ],
        calculate: (vals) => {
          const {mu_s,mu_k,N}=vals;
          if(N===undefined)return{result:"Need Normal Force (N).",steps:"Enter N."};
          let fs=fk=0,s="";
          if(mu_s!==undefined){fs=mu_s*N;s+=`Static max: fs = μs×N = ${mu_s}×${N} = ${fs.toFixed(4)} N\n`;}
          if(mu_k!==undefined){fk=mu_k*N;s+=`Kinetic: fk = μk×N = ${mu_k}×${N} = ${fk.toFixed(4)} N\n`;}
          if(!mu_s&&!mu_k)return{result:"Need at least one friction coefficient.",steps:"Enter μs or μk."};
          return{result:`Normal Force = ${N} N\n${mu_s!==undefined?`Max static friction = ${fs.toFixed(4)} N\n`:``}${mu_k!==undefined?`Kinetic friction = ${fk.toFixed(4)} N`:``}`,steps:s};
        }
      },
      {
        id: "hookes-law", name: "Hooke's Law (Spring Force)",
        description: "F=kx. Solves for spring force, spring constant, or displacement.",
        equation: "F = kx",
        variables: [
          { id: "F", label: "Spring Force", unit: "N" },
          { id: "k", label: "Spring Constant", unit: "N/m" },
          { id: "x", label: "Displacement", unit: "m" }
        ],
        calculate: (vals) => {
          const {F,k,x}=vals;
          const kn=Object.keys(vals).length;
          if(kn<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oF=F,ok=k,ox=x,s="";
          if(F===undefined){oF=k*x;s=`F = kx = ${k}×${x} = ${oF.toFixed(4)} N`;}
          else if(k===undefined){ok=F/x;s=`k = F/x = ${ok.toFixed(4)} N/m`;}
          else if(x===undefined){ox=F/k;s=`x = F/k = ${ox.toFixed(4)} m`;}
          const PE=0.5*ok*ox*ox;
          return{result:`F = ${oF.toFixed(4)} N | k = ${ok.toFixed(4)} N/m | x = ${ox.toFixed(4)} m\nElastic PE = ½kx² = ${PE.toFixed(4)} J`,steps:s};
        }
      },
      {
        id: "center-of-mass", name: "Center of Mass (2 Particles)",
        description: "x_cm=(m₁x₁+m₂x₂)/(m₁+m₂). Solves for center of mass or any mass/position.",
        equation: "x_cm = (m₁x₁ + m₂x₂) / (m₁ + m₂)",
        variables: [
          { id: "xcm", label: "Center of Mass", unit: "m" },
          { id: "m1", label: "Mass 1", unit: "kg" },
          { id: "x1", label: "Position 1", unit: "m" },
          { id: "m2", label: "Mass 2", unit: "kg" },
          { id: "x2", label: "Position 2", unit: "m" }
        ],
        calculate: (vals) => {
          const {xcm,m1,x1,m2,x2}=vals;
          const k=Object.keys(vals).length;
          if(k<4)return{result:"Need at least 4 of 5.",steps:"Provide 4 values."};
          let oXcm=xcm,om1=m1,ox1=x1,om2=m2,ox2=x2,s="";
          if(xcm===undefined){oXcm=(m1*x1+m2*x2)/(m1+m2);s=`x_cm = (${m1}×${x1}+${m2}×${x2})/(${m1}+${m2}) = ${oXcm.toFixed(4)} m`;}
          else if(x1===undefined){ox1=(xcm*(m1+m2)-m2*x2)/m1;s=`x₁ = ${ox1.toFixed(4)} m`;}
          else if(x2===undefined){ox2=(xcm*(m1+m2)-m1*x1)/m2;s=`x₂ = ${ox2.toFixed(4)} m`;}
          else if(m1===undefined){om1=m2*(xcm-x2)/(x1-xcm);s=`m₁ = ${om1.toFixed(4)} kg`;}
          else if(m2===undefined){om2=m1*(xcm-x1)/(x2-xcm);s=`m₂ = ${om2.toFixed(4)} kg`;}
          return{result:`x_cm = ${oXcm.toFixed(4)} m\nm₁=${om1.toFixed(2)} kg at x₁=${ox1.toFixed(2)} m\nm₂=${om2.toFixed(2)} kg at x₂=${ox2.toFixed(2)} m`,steps:s};
        }
      }
    ]
  },
  {
    category: "Work, Energy & Power",
    icon: "Cog",
    formulas: [
      {
        id: "work-done", name: "Work Done by Force",
        description: "W=Fdcosθ. Solves for work, force, displacement, or angle.",
        equation: "W = Fd cos(θ)",
        variables: [
          { id: "W", label: "Work", unit: "J" },
          { id: "F", label: "Force", unit: "N" },
          { id: "d", label: "Displacement", unit: "m" },
          { id: "theta", label: "Angle (F to d)", unit: "°" }
        ],
        calculate: (vals) => {
          const d2r=d=>d*Math.PI/180,r2d=r=>r*180/Math.PI;
          const {W,F,d,theta}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oW=W,oF=F,oD=d,oTh=theta,s="";
          if(W===undefined){oW=F*d*Math.cos(d2r(theta));s=`W = Fdcosθ = ${F}×${d}×cos(${theta}°) = ${oW.toFixed(4)} J`;}
          else if(F===undefined){oF=W/(d*Math.cos(d2r(theta)));s=`F = ${oF.toFixed(4)} N`;}
          else if(d===undefined){oD=W/(F*Math.cos(d2r(theta)));s=`d = ${oD.toFixed(4)} m`;}
          else if(theta===undefined){const cv=W/(F*d);if(Math.abs(cv)>1)return{result:"Error: |W/(Fd)| > 1",steps:"No valid angle."};oTh=r2d(Math.acos(cv));s=`θ = ${oTh.toFixed(2)}°`;}
          return{result:`W = ${oW.toFixed(4)} J | F = ${oF.toFixed(4)} N\nd = ${oD.toFixed(4)} m | θ = ${oTh.toFixed(2)}°\n${oW>0?"Positive work (force helps motion)":oW<0?"Negative work (force opposes motion)":"No work done"}`,steps:s};
        }
      },
      {
        id: "kinetic-energy", name: "Kinetic Energy",
        description: "KE=½mv². Solves for KE, mass, or velocity.",
        equation: "KE = ½mv²",
        variables: [
          { id: "KE", label: "Kinetic Energy", unit: "J" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "v", label: "Velocity", unit: "m/s" }
        ],
        calculate: (vals) => {
          const {KE,m,v}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oKE=KE,om=m,ov=v,s="";
          if(KE===undefined){oKE=0.5*m*v*v;s=`KE = ½mv² = ½×${m}×${v}² = ${oKE.toFixed(4)} J`;}
          else if(m===undefined){om=2*KE/(v*v);s=`m = 2KE/v² = ${om.toFixed(4)} kg`;}
          else if(v===undefined){ov=Math.sqrt(2*KE/m);s=`v = √(2KE/m) = ${ov.toFixed(4)} m/s`;}
          return{result:`KE = ${oKE.toFixed(4)} J | m = ${om.toFixed(4)} kg | v = ${ov.toFixed(4)} m/s`,steps:s};
        }
      },
      {
        id: "gpe-local", name: "Gravitational PE (Local)",
        description: "PE=mgh. Solves for potential energy, mass, height, or gravity.",
        equation: "PE = mgh",
        variables: [
          { id: "PE", label: "Potential Energy", unit: "J" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "g", label: "Gravity", unit: "m/s²" },
          { id: "h", label: "Height", unit: "m" }
        ],
        calculate: (vals) => {
          const {PE,m,g,h}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oPE=PE,om=m,og=g,oh=h,s="";
          if(PE===undefined){oPE=m*g*h;s=`PE = mgh = ${m}×${g}×${h} = ${oPE.toFixed(4)} J`;}
          else if(m===undefined){om=PE/(g*h);s=`m = PE/(gh) = ${om.toFixed(4)} kg`;}
          else if(g===undefined){og=PE/(m*h);s=`g = PE/(mh) = ${og.toFixed(4)} m/s²`;}
          else if(h===undefined){oh=PE/(m*g);s=`h = PE/(mg) = ${oh.toFixed(4)} m`;}
          return{result:`PE = ${oPE.toFixed(4)} J | m = ${om.toFixed(4)} kg\ng = ${og.toFixed(4)} m/s² | h = ${oh.toFixed(4)} m`,steps:s};
        }
      },
      {
        id: "elastic-pe", name: "Elastic PE (Spring)",
        description: "PE=½kx². Solves for elastic potential energy, spring constant, or displacement.",
        equation: "PE = ½kx²",
        variables: [
          { id: "PE", label: "Elastic PE", unit: "J" },
          { id: "k", label: "Spring Constant", unit: "N/m" },
          { id: "x", label: "Displacement", unit: "m" }
        ],
        calculate: (vals) => {
          const {PE,k,x}=vals;
          const kn=Object.keys(vals).length;
          if(kn<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oPE=PE,ok=k,ox=x,s="";
          if(PE===undefined){oPE=0.5*k*x*x;s=`PE = ½kx² = ½×${k}×${x}² = ${oPE.toFixed(4)} J`;}
          else if(k===undefined){ok=2*PE/(x*x);s=`k = 2PE/x² = ${ok.toFixed(4)} N/m`;}
          else if(x===undefined){ox=Math.sqrt(2*PE/k);s=`x = √(2PE/k) = ${ox.toFixed(4)} m`;}
          return{result:`PE = ${oPE.toFixed(4)} J | k = ${ok.toFixed(4)} N/m | x = ${ox.toFixed(4)} m`,steps:s};
        }
      },
      {
        id: "power-mechanical", name: "Mechanical Power",
        description: "P=W/t=Fv. Solves for power, work, time, force, or velocity.",
        equation: "P = W/t = Fv",
        variables: [
          { id: "P", label: "Power", unit: "W" },
          { id: "W", label: "Work", unit: "J" },
          { id: "t", label: "Time", unit: "s" }
        ],
        calculate: (vals) => {
          const {P,W,t}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oP=P,oW=W,oT=t,s="";
          if(P===undefined){oP=W/t;s=`P = W/t = ${W}/${t} = ${oP.toFixed(4)} W`;}
          else if(W===undefined){oW=P*t;s=`W = Pt = ${oW.toFixed(4)} J`;}
          else if(t===undefined){oT=W/P;s=`t = W/P = ${oT.toFixed(4)} s`;}
          const hp=oP/746;
          return{result:`P = ${oP.toFixed(4)} W (${hp.toFixed(4)} hp)\nW = ${oW.toFixed(4)} J | t = ${oT.toFixed(4)} s`,steps:s};
        }
      },
      {
        id: "rotational-kinematics", name: "Rotational Kinematics",
        description: "ω=ω₀+αt, θ=ω₀t+½αt². Solves for angular variables.",
        equation: "ω = ω₀ + αt",
        variables: [
          { id: "omega", label: "Final Angular Vel (ω)", unit: "rad/s" },
          { id: "omega0", label: "Initial Angular Vel (ω₀)", unit: "rad/s" },
          { id: "alpha", label: "Angular Accel (α)", unit: "rad/s²" },
          { id: "t", label: "Time", unit: "s" }
        ],
        calculate: (vals) => {
          const {omega,omega0,alpha,t}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oO=omega,oO0=omega0,oA=alpha,oT=t,s="";
          if(omega===undefined){oO=omega0+alpha*t;s=`ω = ω₀+αt = ${oO.toFixed(4)} rad/s`;}
          else if(omega0===undefined){oO0=omega-alpha*t;s=`ω₀ = ${oO0.toFixed(4)} rad/s`;}
          else if(alpha===undefined){oA=(omega-omega0)/t;s=`α = ${oA.toFixed(4)} rad/s²`;}
          else if(t===undefined){oT=(omega-omega0)/alpha;s=`t = ${oT.toFixed(4)} s`;}
          const theta=oO0*oT+0.5*oA*oT*oT;
          const rpm=oO*60/(2*Math.PI);
          const revs=theta/(2*Math.PI);
          return{result:`ω = ${oO.toFixed(4)} rad/s (${rpm.toFixed(2)} RPM)\nω₀ = ${oO0.toFixed(4)} rad/s | α = ${oA.toFixed(4)} rad/s²\nt = ${oT.toFixed(4)} s | θ = ${theta.toFixed(4)} rad (${revs.toFixed(2)} rev)`,steps:s};
        }
      },
      {
        id: "rotational-ke", name: "Rotational Kinetic Energy",
        description: "KE=½Iω². Solves for rotational KE, moment of inertia, or angular velocity.",
        equation: "KE_rot = ½Iω²",
        variables: [
          { id: "KE", label: "Rotational KE", unit: "J" },
          { id: "I", label: "Moment of Inertia", unit: "kg·m²" },
          { id: "omega", label: "Angular Velocity", unit: "rad/s" }
        ],
        calculate: (vals) => {
          const {KE,I,omega}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oKE=KE,oI=I,oO=omega,s="";
          if(KE===undefined){oKE=0.5*I*omega*omega;s=`KE = ½Iω² = ${oKE.toFixed(4)} J`;}
          else if(I===undefined){oI=2*KE/(omega*omega);s=`I = 2KE/ω² = ${oI.toFixed(4)} kg·m²`;}
          else if(omega===undefined){oO=Math.sqrt(2*KE/I);s=`ω = √(2KE/I) = ${oO.toFixed(4)} rad/s`;}
          const rpm=oO*60/(2*Math.PI);
          return{result:`KE = ${oKE.toFixed(4)} J | I = ${oI.toFixed(4)} kg·m²\nω = ${oO.toFixed(4)} rad/s (${rpm.toFixed(2)} RPM)`,steps:s};
        }
      },
      {
        id: "mass-spring-period", name: "Mass-Spring System (SHM)",
        description: "T=2π√(m/k). Solves for period, mass, or spring constant.",
        equation: "T = 2π√(m/k)",
        variables: [
          { id: "T", label: "Period", unit: "s" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "k", label: "Spring Constant", unit: "N/m" }
        ],
        calculate: (vals) => {
          const {T,m,k}=vals;
          const kn=Object.keys(vals).length;
          if(kn<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oT=T,om=m,ok=k,s="";
          if(T===undefined){oT=2*Math.PI*Math.sqrt(m/k);s=`T = 2π√(m/k) = ${oT.toFixed(4)} s`;}
          else if(m===undefined){om=k*Math.pow(T/(2*Math.PI),2);s=`m = k(T/2π)² = ${om.toFixed(4)} kg`;}
          else if(k===undefined){ok=m*Math.pow(2*Math.PI/T,2);s=`k = m(2π/T)² = ${ok.toFixed(4)} N/m`;}
          const freq=1/oT;
          const omega=2*Math.PI/oT;
          return{result:`T = ${oT.toFixed(4)} s | f = ${freq.toFixed(4)} Hz\nm = ${om.toFixed(4)} kg | k = ${ok.toFixed(4)} N/m\nω = ${omega.toFixed(4)} rad/s`,steps:s};
        }
      }
    ]
  },
  {
    category: "Thermodynamics & Waves",
    icon: "Thermometer",
    formulas: [
      {
        id: "thermal-expansion", name: "Thermal Linear Expansion",
        description: "ΔL=αL₀ΔT. Solves for expansion, coefficient, original length, or temperature change.",
        equation: "ΔL = αL₀ΔT",
        variables: [
          { id: "dL", label: "Length Change (ΔL)", unit: "m" },
          { id: "alpha", label: "Expansion Coeff (α)", unit: "1/°C" },
          { id: "L0", label: "Original Length (L₀)", unit: "m" },
          { id: "dT", label: "Temperature Change (ΔT)", unit: "°C" }
        ],
        calculate: (vals) => {
          const {dL,alpha,L0,dT}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oDL=dL,oA=alpha,oL0=L0,oDT=dT,s="";
          if(dL===undefined){oDL=alpha*L0*dT;s=`ΔL = αL₀ΔT = ${alpha}×${L0}×${dT} = ${oDL.toExponential(4)} m`;}
          else if(alpha===undefined){oA=dL/(L0*dT);s=`α = ΔL/(L₀ΔT) = ${oA.toExponential(4)} /°C`;}
          else if(L0===undefined){oL0=dL/(alpha*dT);s=`L₀ = ΔL/(αΔT) = ${oL0.toFixed(4)} m`;}
          else if(dT===undefined){oDT=dL/(alpha*L0);s=`ΔT = ΔL/(αL₀) = ${oDT.toFixed(4)} °C`;}
          const Lfinal=oL0+oDL;
          return{result:`ΔL = ${oDL.toExponential(4)} m | L₀ = ${oL0.toFixed(4)} m\nL_final = ${Lfinal.toFixed(6)} m | α = ${oA.toExponential(4)} /°C\nΔT = ${oDT.toFixed(4)} °C`,steps:s};
        }
      },
      {
        id: "latent-heat", name: "Latent Heat (Phase Change)",
        description: "Q=mL. Solves for heat, mass, or latent heat of fusion/vaporization.",
        equation: "Q = mL",
        variables: [
          { id: "Q", label: "Heat Energy", unit: "J" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "L", label: "Latent Heat (L)", unit: "J/kg" }
        ],
        calculate: (vals) => {
          const {Q,m,L}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oQ=Q,om=m,oL=L,s="";
          if(Q===undefined){oQ=m*L;s=`Q = mL = ${m}×${L} = ${oQ.toFixed(4)} J`;}
          else if(m===undefined){om=Q/L;s=`m = Q/L = ${om.toFixed(4)} kg`;}
          else if(L===undefined){oL=Q/m;s=`L = Q/m = ${oL.toFixed(4)} J/kg`;}
          return{result:`Q = ${oQ.toFixed(4)} J (${(oQ/1000).toFixed(4)} kJ)\nm = ${om.toFixed(4)} kg | L = ${oL.toFixed(4)} J/kg`,steps:s+`\nCommon: L_f(water)=334000 J/kg, L_v(water)=2260000 J/kg`};
        }
      },
      {
        id: "first-law-thermo", name: "First Law of Thermodynamics",
        description: "ΔU=Q−W. Solves for internal energy change, heat, or work.",
        equation: "ΔU = Q − W",
        variables: [
          { id: "dU", label: "Internal Energy Change (ΔU)", unit: "J" },
          { id: "Q", label: "Heat Added (Q)", unit: "J" },
          { id: "W", label: "Work Done by System (W)", unit: "J" }
        ],
        calculate: (vals) => {
          const {dU,Q,W}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oDU=dU,oQ=Q,oW=W,s="";
          if(dU===undefined){oDU=Q-W;s=`ΔU = Q−W = ${Q}−${W} = ${oDU.toFixed(4)} J`;}
          else if(Q===undefined){oQ=dU+W;s=`Q = ΔU+W = ${oQ.toFixed(4)} J`;}
          else if(W===undefined){oW=Q-dU;s=`W = Q−ΔU = ${oW.toFixed(4)} J`;}
          return{result:`ΔU = ${oDU.toFixed(4)} J | Q = ${oQ.toFixed(4)} J | W = ${oW.toFixed(4)} J\n${oQ>0?"Heat added to system":"Heat removed from system"}\n${oW>0?"System does work":"Work done on system"}\n${oDU>0?"Internal energy increased":"Internal energy decreased"}`,steps:s};
        }
      },
      {
        id: "entropy", name: "Entropy Change",
        description: "ΔS=Q/T. Solves for entropy change, heat, or temperature.",
        equation: "ΔS = Q / T",
        variables: [
          { id: "dS", label: "Entropy Change (ΔS)", unit: "J/K" },
          { id: "Q", label: "Heat Transfer (Q)", unit: "J" },
          { id: "T", label: "Temperature (T)", unit: "K" }
        ],
        calculate: (vals) => {
          const {dS,Q,T}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oDS=dS,oQ=Q,oT=T,s="";
          if(dS===undefined){oDS=Q/T;s=`ΔS = Q/T = ${Q}/${T} = ${oDS.toFixed(4)} J/K`;}
          else if(Q===undefined){oQ=dS*T;s=`Q = ΔS×T = ${oQ.toFixed(4)} J`;}
          else if(T===undefined){oT=Q/dS;s=`T = Q/ΔS = ${oT.toFixed(4)} K`;}
          return{result:`ΔS = ${oDS.toFixed(4)} J/K | Q = ${oQ.toFixed(4)} J | T = ${oT.toFixed(4)} K\n${oDS>0?"Process is spontaneous/irreversible":oDS<0?"Non-spontaneous (requires energy input)":"Reversible process"}`,steps:s};
        }
      },
      {
        id: "sound-level", name: "Sound Intensity Level (dB)",
        description: "β=10·log(I/I₀). Solves for decibel level, intensity, or reference intensity.",
        equation: "β = 10 × log₁₀(I/I₀)",
        variables: [
          { id: "beta", label: "Sound Level (β)", unit: "dB" },
          { id: "I", label: "Sound Intensity (I)", unit: "W/m²" },
          { id: "I0", label: "Reference Intensity (I₀)", unit: "W/m²" }
        ],
        calculate: (vals) => {
          const {beta,I,I0}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values. I₀=1e-12 W/m² typical."};
          let oBeta=beta,oI=I,oI0=I0,s="";
          if(beta===undefined){oBeta=10*Math.log10(I/I0);s=`β = 10log(I/I₀) = ${oBeta.toFixed(2)} dB`;}
          else if(I===undefined){oI=I0*Math.pow(10,beta/10);s=`I = I₀×10^(β/10) = ${oI.toExponential(4)} W/m²`;}
          else if(I0===undefined){oI0=I/Math.pow(10,beta/10);s=`I₀ = ${oI0.toExponential(4)} W/m²`;}
          let desc="";
          if(oBeta<20)desc="Whisper";else if(oBeta<40)desc="Quiet room";else if(oBeta<60)desc="Normal conversation";else if(oBeta<80)desc="Busy traffic";else if(oBeta<100)desc="Factory";else if(oBeta<120)desc="Rock concert";else desc="Pain threshold+";
          return{result:`β = ${oBeta.toFixed(2)} dB | I = ${oI.toExponential(4)} W/m²\nReference: ${oI0.toExponential(4)} W/m² | ~${desc}`,steps:s};
        }
      },
      {
        id: "beat-frequency", name: "Beat Frequency",
        description: "f_beat=|f₁−f₂|. Solves for beat frequency or either source frequency.",
        equation: "f_beat = |f₁ − f₂|",
        variables: [
          { id: "fb", label: "Beat Frequency", unit: "Hz" },
          { id: "f1", label: "Frequency 1 (f₁)", unit: "Hz" },
          { id: "f2", label: "Frequency 2 (f₂)", unit: "Hz" }
        ],
        calculate: (vals) => {
          const {fb,f1,f2}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oFb=fb,oF1=f1,oF2=f2,s="";
          if(fb===undefined){oFb=Math.abs(f1-f2);s=`f_beat = |f₁−f₂| = |${f1}−${f2}| = ${oFb.toFixed(4)} Hz`;}
          else if(f1===undefined){oF1=f2+fb;s=`f₁ = f₂+f_beat = ${oF1.toFixed(4)} Hz (or f₂−f_beat = ${(f2-fb).toFixed(4)} Hz)`;}
          else if(f2===undefined){oF2=f1+fb;s=`f₂ = f₁+f_beat = ${oF2.toFixed(4)} Hz (or f₁−f_beat = ${(f1-fb).toFixed(4)} Hz)`;}
          const period=1/oFb;
          return{result:`Beat freq = ${oFb.toFixed(4)} Hz | Beat period = ${period.toFixed(4)} s\nf₁ = ${oF1.toFixed(4)} Hz | f₂ = ${oF2.toFixed(4)} Hz`,steps:s};
        }
      },
      {
        id: "critical-angle", name: "Critical Angle (TIR)",
        description: "θc=arcsin(n₂/n₁). Computes critical angle for total internal reflection.",
        equation: "θ_c = arcsin(n₂/n₁)",
        variables: [
          { id: "n1", label: "Denser Medium (n₁)", unit: "" },
          { id: "n2", label: "Less Dense Medium (n₂)", unit: "" }
        ],
        calculate: (vals) => {
          const {n1,n2}=vals;
          if(n1===undefined||n2===undefined)return{result:"Need both n₁ and n₂.",steps:"Enter both refractive indices."};
          const ratio=n2/n1;
          if(ratio>=1)return{result:`n₂/n₁ = ${ratio.toFixed(4)} ≥ 1\nNo total internal reflection possible.\nLight goes from less dense to denser medium.`,steps:`For TIR: n₁ > n₂ required.`};
          const critAngle=Math.asin(ratio)*180/Math.PI;
          const critRad=Math.asin(ratio);
          return{result:`Critical angle = ${critAngle.toFixed(2)}° (${critRad.toFixed(4)} rad)\nn₁ = ${n1} | n₂ = ${n2} | n₂/n₁ = ${ratio.toFixed(4)}\nTIR occurs when θ > ${critAngle.toFixed(2)}°`,steps:`θc = arcsin(${n2}/${n1}) = arcsin(${ratio.toFixed(4)}) = ${critAngle.toFixed(2)}°`};
        }
      },
      {
        id: "double-slit", name: "Young's Double Slit",
        description: "y=λL/d. Solves for fringe spacing, wavelength, distance to screen, or slit separation.",
        equation: "y = λL/d",
        variables: [
          { id: "y", label: "Fringe Spacing", unit: "m" },
          { id: "lambda", label: "Wavelength (λ)", unit: "nm" },
          { id: "L", label: "Screen Distance", unit: "m" },
          { id: "d", label: "Slit Separation", unit: "m" }
        ],
        calculate: (vals) => {
          const {y,lambda,L,d}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oY=y,oLam=lambda,oL=L,oD=d,s="";
          const lamM=lambda*1e-9;
          if(y===undefined){oY=lamM*L/d;s=`y = λL/d = ${lambda}×10⁻⁹×${L}/${d} = ${oY.toExponential(4)} m`;}
          else if(lambda===undefined){oLam=y*d/L*1e9;s=`λ = yd/L = ${oLam.toFixed(2)} nm`;}
          else if(L===undefined){oL=y*d/lamM;s=`L = yd/λ = ${oL.toFixed(4)} m`;}
          else if(d===undefined){oD=lamM*L/y;s=`d = λL/y = ${oD.toExponential(4)} m`;}
          const n=5;
          const maxOrder=Math.floor(oD/(oLam*1e-9));
          return{result:`Fringe spacing = ${oY.toExponential(4)} m (${(oY*1000).toFixed(4)} mm)\nλ = ${oLam.toFixed(2)} nm | L = ${oL.toFixed(4)} m | d = ${oD.toExponential(4)} m\nMax visible order ≈ ${maxOrder}`,steps:s};
        }
      }
    ]
  },
  {
    category: "General Chemistry",
    icon: "Calculator",
    formulas: [
      {
        id: "density", name: "Density / Mass / Volume",
        description: "ρ=m/V. Solves for density, mass, or volume.",
        equation: "ρ = m/V",
        variables: [
          { id: "rho", label: "Density (ρ)", unit: "kg/m³" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "V", label: "Volume", unit: "m³" }
        ],
        calculate: (vals) => {
          const {rho,m,V}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oRho=rho,om=m,oV=V,s="";
          if(rho===undefined){oRho=m/V;s=`ρ = m/V = ${m}/${V} = ${oRho.toFixed(4)} kg/m³`;}
          else if(m===undefined){om=rho*V;s=`m = ρV = ${om.toFixed(4)} kg`;}
          else if(V===undefined){oV=m/rho;s=`V = m/ρ = ${oV.toFixed(4)} m³`;}
          return{result:`ρ = ${oRho.toFixed(4)} kg/m³ | m = ${om.toFixed(4)} kg | V = ${oV.toFixed(6)} m³`,steps:s};
        }
      },
      {
        id: "moles-calc", name: "Moles & Molar Mass",
        description: "n=m/M. Solves for moles, mass, or molar mass. Also computes particle count.",
        equation: "n = m/M, N = n × Nₐ",
        variables: [
          { id: "n", label: "Moles (n)", unit: "mol" },
          { id: "m", label: "Mass (m)", unit: "g" },
          { id: "M", label: "Molar Mass (M)", unit: "g/mol" }
        ],
        calculate: (vals) => {
          const Na=6.022e23;
          const {n,m,M}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oN=n,om=m,oM=M,s="";
          if(n===undefined){oN=m/M;s=`n = m/M = ${m}/${M} = ${oN.toFixed(6)} mol`;}
          else if(m===undefined){om=n*M;s=`m = nM = ${om.toFixed(4)} g`;}
          else if(M===undefined){oM=m/n;s:`M = m/n = ${oM.toFixed(4)} g/mol`;}
          const particles=oN*Na;
          return{result:`n = ${oN.toFixed(6)} mol | m = ${om.toFixed(4)} g | M = ${oM.toFixed(4)} g/mol\nParticles = n×Nₐ = ${particles.toExponential(4)}`,steps:s};
        }
      },
      {
        id: "molarity", name: "Molarity (M)",
        description: "M=n/V(solution). Solves for molarity, moles, or volume.",
        equation: "M = n / V",
        variables: [
          { id: "M", label: "Molarity", unit: "mol/L" },
          { id: "n", label: "Moles of Solute", unit: "mol" },
          { id: "V", label: "Volume of Solution", unit: "L" }
        ],
        calculate: (vals) => {
          const {M,n,V}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oM=M,oN=n,oV=V,s="";
          if(M===undefined){oM=n/V;s:`M = n/V = ${n}/${V} = ${oM.toFixed(4)} mol/L`;}
          else if(n===undefined){oN=M*V;s:`n = MV = ${oN.toFixed(4)} mol`;}
          else if(V===undefined){oV=n/M;s:`V = n/M = ${oV.toFixed(4)} L`;}
          return{result:`M = ${oM.toFixed(4)} mol/L | n = ${oN.toFixed(4)} mol | V = ${oV.toFixed(4)} L`,steps:s};
        }
      },
      {
        id: "percent-yield", name: "Percent Yield & Error",
        description: "Computes percent yield and percent error for experiments.",
        equation: "% yield = (actual/theoretical)×100",
        variables: [
          { id: "actual", label: "Actual/Experimental Value", unit: "" },
          { id: "theoretical", label: "Theoretical/Accepted Value", unit: "" }
        ],
        calculate: (vals) => {
          const {actual,theoretical}=vals;
          if(actual===undefined||theoretical===undefined)return{result:"Need both values.",steps:"Enter actual and theoretical."};
          if(theoretical===0)return{result:"Error: Division by zero.",steps:"Theoretical value cannot be 0."};
          const yield_=(actual/theoretical)*100;
          const error=Math.abs(actual-theoretical)/Math.abs(theoretical)*100;
          return{result:`Percent Yield = ${yield_.toFixed(2)}%\nPercent Error = ${error.toFixed(2)}%\nActual = ${actual} | Theoretical = ${theoretical}`,steps:`% yield = (${actual}/${theoretical})×100 = ${yield_.toFixed(2)}%\n% error = |${actual}−${theoretical}|/${theoretical}×100 = ${error.toFixed(2)}%`};
        }
      },
      {
        id: "boyle-law", name: "Boyle's Law",
        description: "P₁V₁=P₂V₂. Solves for any pressure or volume in gas compression/expansion.",
        equation: "P₁V₁ = P₂V₂",
        variables: [
          { id: "P1", label: "Initial Pressure (P₁)", unit: "Pa" },
          { id: "V1", label: "Initial Volume (V₁)", unit: "m³" },
          { id: "P2", label: "Final Pressure (P₂)", unit: "Pa" },
          { id: "V2", label: "Final Volume (V₂)", unit: "m³" }
        ],
        calculate: (vals) => {
          const {P1,V1,P2,V2}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oP1=P1,oV1=V1,oP2=P2,oV2=V2,s="";
          if(V2===undefined){oV2=P1*V1/P2;s=`V₂ = P₁V₁/P₂ = ${oV2.toFixed(4)} m³`;}
          else if(P2===undefined){oP2=P1*V1/V2;s=`P₂ = P₁V₁/V₂ = ${oP2.toFixed(4)} Pa`;}
          else if(V1===undefined){oV1=P2*V2/P1;s:`V₁ = ${oV1.toFixed(4)} m³`;}
          else if(P1===undefined){oP1=P2*V2/V1;s:`P₁ = ${oP1.toFixed(4)} Pa`;}
          return{result:`P₁ = ${oP1.toFixed(4)} Pa | V₁ = ${oV1.toFixed(4)} m³\nP₂ = ${oP2.toFixed(4)} Pa | V₂ = ${oV2.toFixed(4)} m³`,steps:s};
        }
      },
      {
        id: "charles-law", name: "Charles's Law",
        description: "V₁/T₁=V₂/T₂. Solves for any volume or temperature. Temperature must be in Kelvin.",
        equation: "V₁/T₁ = V₂/T₂",
        variables: [
          { id: "V1", label: "Initial Volume (V₁)", unit: "m³" },
          { id: "T1", label: "Initial Temp (T₁)", unit: "K" },
          { id: "V2", label: "Final Volume (V₂)", unit: "m³" },
          { id: "T2", label: "Final Temp (T₂)", unit: "K" }
        ],
        calculate: (vals) => {
          const {V1,T1,V2,T2}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values. Temp in Kelvin!"};
          let oV1=V1,oT1=T1,oV2=V2,oT2=T2,s="";
          if(V2===undefined){oV2=V1*T2/T1;s=`V₂ = V₁T₂/T₁ = ${oV2.toFixed(4)} m³`;}
          else if(T2===undefined){oT2=V2*T1/V1;s:`T₂ = V₂T₁/V₁ = ${oT2.toFixed(4)} K`;}
          else if(V1===undefined){oV1=V2*T1/T2;s:`V₁ = ${oV1.toFixed(4)} m³`;}
          else if(T1===undefined){oT1=V1*T2/V2;s:`T₁ = ${oT1.toFixed(4)} K`;}
          return{result:`V₁ = ${oV1.toFixed(4)} m³ | T₁ = ${oT1.toFixed(4)} K (${(oT1-273.15).toFixed(2)}°C)\nV₂ = ${oV2.toFixed(4)} m³ | T₂ = ${oT2.toFixed(4)} K (${(oT2-273.15).toFixed(2)}°C)`,steps:s};
        }
      },
      {
        id: "combined-gas", name: "Combined Gas Law",
        description: "P₁V₁/T₁=P₂V₂/T₂. Solves for any pressure, volume, or temperature.",
        equation: "P₁V₁/T₁ = P₂V₂/T₂",
        variables: [
          { id: "P1", label: "P₁", unit: "Pa" },
          { id: "V1", label: "V₁", unit: "m³" },
          { id: "T1", label: "T₁", unit: "K" },
          { id: "P2", label: "P₂", unit: "Pa" },
          { id: "V2", label: "V₂", unit: "m³" },
          { id: "T2", label: "T₂", unit: "K" }
        ],
        calculate: (vals) => {
          const {P1,V1,T1,P2,V2,T2}=vals;
          const k=Object.keys(vals).length;
          if(k<5)return{result:"Need at least 5 of 6.",steps:"Provide 5 values."};
          let oP1=P1,oV1=V1,oT1=T1,oP2=P2,oV2=V2,oT2=T2,s="";
          if(P2===undefined){oP2=P1*V1*oT2/(T1*V2);s=`P₂ = P₁V₁T₂/(T₁V₂) = ${oP2.toFixed(4)} Pa`;}
          else if(V2===undefined){oV2=P1*V1*oT2/(T1*P2);s:`V₂ = P₁V₁T₂/(T₁P₂) = ${oV2.toFixed(4)} m³`;}
          else if(T2===undefined){oT2=P2*V2*T1/(P1*V1);s:`T₂ = ${oT2.toFixed(4)} K`;}
          else if(P1===undefined){oP1=P2*V2*T1/(T2*V1);s:`P₁ = ${oP1.toFixed(4)} Pa`;}
          else if(V1===undefined){oV1=P2*V2*T1/(T2*P1);s:`V₁ = ${oV1.toFixed(4)} m³`;}
          else if(T1===undefined){oT1=P1*V1*T2/(P2*V2);s:`T₁ = ${oT1.toFixed(4)} K`;}
          return{result:`P₁=${oP1.toFixed(2)} Pa, V₁=${oV1.toFixed(4)} m³, T₁=${oT1.toFixed(2)} K\nP₂=${oP2.toFixed(2)} Pa, V₂=${oV2.toFixed(4)} m³, T₂=${oT2.toFixed(2)} K`,steps:s};
        }
      },
      {
        id: "gibbs-free", name: "Gibbs Free Energy",
        description: "G=H−TS. Solves for Gibbs energy, enthalpy, entropy, or temperature.",
        equation: "ΔG = ΔH − TΔS",
        variables: [
          { id: "dG", label: "Gibbs Free Energy (ΔG)", unit: "kJ" },
          { id: "dH", label: "Enthalpy (ΔH)", unit: "kJ" },
          { id: "T", label: "Temperature", unit: "K" },
          { id: "dS", label: "Entropy (ΔS)", unit: "kJ/K" }
        ],
        calculate: (vals) => {
          const {dG,dH,T,dS}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oDG=dG,oDH=dH,oT=T,oDS=dS,s="";
          if(dG===undefined){oDG=dH-T*dS;s:`ΔG = ΔH−TΔS = ${dH}−${T}×${dS} = ${oDG.toFixed(4)} kJ`;}
          else if(dH===undefined){oDH=dG+T*dS;s:`ΔH = ΔG+TΔS = ${oDH.toFixed(4)} kJ`;}
          else if(T===undefined){oT=(dH-dG)/dS;s:`T = (ΔH−ΔG)/ΔS = ${oT.toFixed(4)} K`;}
          else if(dS===undefined){oDS=(dH-dG)/T;s:`ΔS = (ΔH−ΔG)/T = ${oDS.toFixed(6)} kJ/K`;}
          const spont=oDG<0?"Spontaneous ✅":oDG>0?"Non-spontaneous ❌":"At equilibrium ⚖️";
          return{result:`ΔG = ${oDG.toFixed(4)} kJ | ΔH = ${oDH.toFixed(4)} kJ\nT = ${oT.toFixed(4)} K | ΔS = ${oDS.toFixed(6)} kJ/K\n${spont}`,steps:s};
        }
      },
      {
        id: "arrhenius", name: "Arrhenius Equation",
        description: "k=Ae^(−Ea/RT). Solves for rate constant, activation energy, or temperature.",
        equation: "k = A × e^(−Ea/RT)",
        variables: [
          { id: "k", label: "Rate Constant (k)", unit: "" },
          { id: "A", label: "Pre-exponential Factor (A)", unit: "" },
          { id: "Ea", label: "Activation Energy (Ea)", unit: "J/mol" },
          { id: "T", label: "Temperature", unit: "K" }
        ],
        calculate: (vals) => {
          const R=8.314;
          const {k,A,Ea,T}=vals;
          const kn=Object.keys(vals).length;
          if(kn<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oK=k,oA=A,oEa=Ea,oT=T,s="";
          if(k===undefined){oK=A*Math.exp(-Ea/(R*T));s:`k = A×e^(−Ea/RT) = ${oK.toExponential(4)}`;}
          else if(A===undefined){oA=k*Math.exp(Ea/(R*T));s:`A = ${oA.toExponential(4)}`;}
          else if(Ea===undefined){const ratio=k/A;if(ratio<=0)return{result:"Error: k/A must be positive for ln().",steps:"k and A must be positive."};oEa=-R*T*Math.log(ratio);s:`Ea = −RT×ln(k/A) = ${oEa.toFixed(2)} J/mol (${(oEa/1000).toFixed(4)} kJ/mol)`;}
          else if(T===undefined){const ratio=k/A;if(ratio<=0)return{result:"Error: k/A must be positive for ln().",steps:"k and A must be positive."};const logVal=Math.log(ratio);if(logVal===0)return{result:"Error: k=A, cannot solve for T.",steps:"k must differ from A."};oT=-Ea/(R*logVal);s:`T = −Ea/(R×ln(k/A)) = ${oT.toFixed(2)} K`;}
          return{result:`k = ${oK.toExponential(4)} | A = ${oA.toExponential(4)}\nEa = ${oEa.toFixed(2)} J/mol (${(oEa/1000).toFixed(2)} kJ/mol)\nT = ${oT.toFixed(2)} K`,steps:s};
        }
      },
      {
        id: "half-life-first", name: "Half-Life (First Order)",
        description: "t½=ln(2)/k. Solves for half-life or rate constant of first-order reactions.",
        equation: "t½ = ln(2)/k",
        variables: [
          { id: "thalf", label: "Half-life (t½)", unit: "s" },
          { id: "k", label: "Rate Constant (k)", unit: "1/s" }
        ],
        calculate: (vals) => {
          const {thalf,k}=vals;
          if(thalf===undefined&&k===undefined)return{result:"Need either t½ or k.",steps:"Provide 1 value."};
          let oTh=thalf,oK=k,s="";
          if(thalf===undefined){oK=k;oTh=Math.LN2/k;s=`t½ = ln(2)/k = 0.693/${k} = ${oTh.toFixed(4)} s`;}
          else if(k===undefined){oK=Math.LN2/thalf;s:`k = ln(2)/t½ = ${oK.toExponential(4)} /s`;}
          const t75=2*oTh;
          const t90=oTh*Math.log(10)/Math.LN2;
          const t99=oTh*Math.log(100)/Math.LN2;
          return{result:`t½ = ${oTh.toFixed(4)} s | k = ${oK.toExponential(4)} /s\n75% decay: ${t75.toFixed(4)} s | 90% decay: ${t90.toFixed(4)} s\n99% decay: ${t99.toFixed(4)} s`,steps:s};
        }
      },
      {
        id: "equilibrium-kc", name: "Equilibrium Constant (Kc)",
        description: "Computes Kc from concentrations. aA+bB ⇌ cC+dD.",
        equation: "Kc = [C]^c[D]^d / [A]^a[B]^b",
        variables: [
          { id: "Kc", label: "Equilibrium Constant (Kc)", unit: "" },
          { id: "products", label: "[Products]^coeffs (e.g. 0.5,0.3)", unit: "" },
          { id: "reactants", label: "[Reactants]^coeffs (e.g. 0.1,0.2)", unit: "" }
        ],
        calculate: (vals) => {
          const {Kc,products,reactants}=vals;
          if(products===undefined||reactants===undefined)return{result:"Enter product and reactant terms.",steps:"Comma-separated concentration^coefficient pairs."};
          const parseTerms=str=>String(str).split(",").map(t=>{const p=t.trim().split("^");return{c:parseFloat(p[0]),e:p[1]?parseFloat(p[1]):1}});
          const pTerms=parseTerms(products);
          const rTerms=parseTerms(reactants);
          let num=1,den=1;
          pTerms.forEach(t=>{if(!isNaN(t.c)&&!isNaN(t.e))num*=Math.pow(t.c,t.e)});
          rTerms.forEach(t=>{if(!isNaN(t.c)&&!isNaN(t.e))den*=Math.pow(t.c,t.e)});
          if(den===0)return{result:"Error: Reactant concentration is 0.",steps:"Check inputs."};
          const oKc=num/den;
          const dir=oKc>1?"Products favored →":oKc<1?"Reactants favored ←":"At equilibrium ⚖️";
          return{result:`Kc = ${oKc.toExponential(4)}\nProduct terms = ${num.toExponential(4)}\nReactant terms = ${den.toExponential(4)}\n${dir}`,steps:`Kc = ${num.toExponential(4)} / ${den.toExponential(4)} = ${oKc.toExponential(4)}`};
        }
      },
      {
        id: "graham-law", name: "Graham's Law of Effusion",
        description: "rate₁/rate₂=√(M₂/M₁). Compares effusion rates of two gases.",
        equation: "rate₁/rate₂ = √(M₂/M₁)",
        variables: [
          { id: "rate1", label: "Rate of Gas 1", unit: "" },
          { id: "rate2", label: "Rate of Gas 2", unit: "" },
          { id: "M1", label: "Molar Mass Gas 1 (g/mol)", unit: "g/mol" },
          { id: "M2", label: "Molar Mass Gas 2 (g/mol)", unit: "g/mol" }
        ],
        calculate: (vals) => {
          const {rate1,rate2,M1,M2}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oR1=rate1,oR2=rate2,oM1=M1,oM2=M2,s="";
          if(rate2===undefined){oR2=rate1*Math.sqrt(M1/M2);s:`rate₂ = rate₁×√(M₁/M₂) = ${oR2.toFixed(4)}`;}
          else if(rate1===undefined){oR1=rate2*Math.sqrt(M2/M1);s:`rate₁ = ${oR1.toFixed(4)}`;}
          else if(M2===undefined){oM2=M1*rate1*rate1/(rate2*rate2);s:`M₂ = ${oM2.toFixed(4)} g/mol`;}
          else if(M1===undefined){oM1=M2*rate2*rate2/(rate1*rate1);s:`M₁ = ${oM1.toFixed(4)} g/mol`;}
          const ratio=oR1/oR2;
          return{result:`rate₁/rate₂ = ${ratio.toFixed(4)}\nGas 1 is ${ratio>1?`${ratio.toFixed(2)}× faster`:`${(1/ratio).toFixed(2)}× slower`} than Gas 2`,steps:s};
        }
      }
    ]
  },
  {
    category: "Biology & Biochemistry",
    icon: "Calculator",
    formulas: [
      {
        id: "hardy-weinberg", name: "Hardy-Weinberg Equilibrium",
        description: "p+q=1, p²+2pq+q²=1. Solves for allele and genotype frequencies.",
        equation: "p² + 2pq + q² = 1",
        variables: [
          { id: "p", label: "Dominant Allele Freq (p)", unit: "" },
          { id: "q", label: "Recessive Allele Freq (q)", unit: "" }
        ],
        calculate: (vals) => {
          const {p,q}=vals;
          if(p===undefined&&q===undefined)return{result:"Enter either p or q.",steps:"Provide 1 value."};
          let oP=p,oQ=q,s="";
          if(p===undefined){oP=1-q;s=`p = 1−q = ${oP.toFixed(4)}`;}
          else if(q===undefined){oQ=1-p;s:`q = 1−p = ${oQ.toFixed(4)}`;}
          const pSq=oP*oP;
          const pq2=2*oP*oQ;
          const qSq=oQ*oQ;
          const chiCheck=pSq+pq2+qSq;
          return{result:`p = ${oP.toFixed(4)} (${(oP*100).toFixed(2)}%) | q = ${oQ.toFixed(4)} (${(oQ*100).toFixed(2)}%)\n\nGenotype frequencies:\np² (homo dominant) = ${pSq.toFixed(4)} (${(pSq*100).toFixed(2)}%)\n2pq (heterozygous) = ${pq2.toFixed(4)} (${(pq2*100).toFixed(2)}%)\nq² (homo recessive) = ${qSq.toFixed(4)} (${(qSq*100).toFixed(2)}%)\n\nSum check: ${(chiCheck).toFixed(6)}`,steps:s};
        }
      },
      {
        id: "population-growth", name: "Population Growth",
        description: "N=N₀e^(rt). Exponential population growth model.",
        equation: "N = N₀ × e^(rt)",
        variables: [
          { id: "N", label: "Future Population (N)", unit: "" },
          { id: "N0", label: "Initial Population (N₀)", unit: "" },
          { id: "r", label: "Growth Rate (r)", unit: "" },
          { id: "t", label: "Time", unit: "" }
        ],
        calculate: (vals) => {
          const {N,N0,r,t}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oN=N,oN0=N0,oR=r,oT=t,s="";
          if(N===undefined){oN=N0*Math.exp(r*t);s:`N = N₀e^(rt) = ${N0}×e^(${r}×${t}) = ${oN.toFixed(2)}`;}
          else if(N0===undefined){oN0=N/Math.exp(r*t);s:`N₀ = ${oN0.toFixed(2)}`;}
          else if(r===undefined){const ratio=N/N0;if(ratio<=0)return{result:"Error: N/N₀ must be positive for ln().",steps:"N and N₀ must have the same sign and N≠0."};oR=Math.log(ratio)/t;s:`r = ln(N/N₀)/t = ${oR.toFixed(6)}`;}
          else if(t===undefined){const ratio=N/N0;if(ratio<=0)return{result:"Error: N/N₀ must be positive for ln().",steps:"N and N₀ must have the same sign and N≠0."};oT=Math.log(ratio)/r;s:`t = ${oT.toFixed(4)}`;}
          const doubling=oR>0?Math.log(2)/oR:Infinity;
          return{result:`N = ${oN.toFixed(2)} | N₀ = ${oN0.toFixed(2)}\nr = ${oR.toFixed(6)} | t = ${oT.toFixed(4)}\nDoubling time = ${doubling.toFixed(4)}`,steps:s};
        }
      },
      {
        id: "bmi", name: "Body Mass Index (BMI)",
        description: "BMI=weight/height². Computes BMI and classifies weight status.",
        equation: "BMI = weight(kg) / height(m)²",
        variables: [
          { id: "weight", label: "Weight", unit: "kg" },
          { id: "height", label: "Height", unit: "m" }
        ],
        calculate: (vals) => {
          const {weight,height}=vals;
          if(weight===undefined||height===undefined)return{result:"Need weight and height.",steps:"Provide both values."};
          const bmi=weight/(height*height);
          let cat="";
          if(bmi<18.5)cat="Underweight";
          else if(bmi<25)cat="Normal weight";
          else if(bmi<30)cat="Overweight";
          else cat="Obese";
          const ibwMin=18.5*height*height;
          const ibwMax=24.9*height*height;
          return{result:`BMI = ${bmi.toFixed(1)} kg/m²\nCategory: ${cat}\nHealthy weight range: ${ibwMin.toFixed(1)}–${ibwMax.toFixed(1)} kg`,steps:`BMI = ${weight}/${height}² = ${bmi.toFixed(1)}`};
        }
      },
      {
        id: "cardiac-output", name: "Cardiac Output",
        description: "CO=HR×SV. Solves for cardiac output, heart rate, or stroke volume.",
        equation: "CO = HR × SV",
        variables: [
          { id: "CO", label: "Cardiac Output", unit: "L/min" },
          { id: "HR", label: "Heart Rate", unit: "bpm" },
          { id: "SV", label: "Stroke Volume", unit: "mL" }
        ],
        calculate: (vals) => {
          const {CO,HR,SV}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oCO=CO,oHR=HR,oSV=SV,s="";
          if(CO===undefined){oCO=HR*SV/1000;s:`CO = HR×SV = ${HR}×${SV}/1000 = ${oCO.toFixed(2)} L/min`;}
          else if(HR===undefined){oHR=CO*1000/SV;s:`HR = CO×1000/SV = ${oHR.toFixed(0)} bpm`;}
          else if(SV===undefined){oSV=CO*1000/HR;s:`SV = CO×1000/HR = ${oSV.toFixed(0)} mL`;}
          return{result:`CO = ${oCO.toFixed(2)} L/min | HR = ${oHR.toFixed(0)} bpm | SV = ${oSV.toFixed(0)} mL`,steps:s};
        }
      },
      {
        id: "map-calc", name: "Mean Arterial Pressure (MAP)",
        description: "MAP=DBP+⅓(SBP−DBP). Computes MAP from blood pressure readings.",
        equation: "MAP = DBP + ⅓(SBP − DBP)",
        variables: [
          { id: "SBP", label: "Systolic BP", unit: "mmHg" },
          { id: "DBP", label: "Diastolic BP", unit: "mmHg" }
        ],
        calculate: (vals) => {
          const {SBP,DBP}=vals;
          if(SBP===undefined||DBP===undefined)return{result:"Need SBP and DBP.",steps:"Provide both values."};
          if(SBP<=DBP)return{result:"Error: SBP must be greater than DBP.",steps:"Check values."};
          const MAP=DBP+(SBP-DBP)/3;
          const pulse=SBP-DBP;
          const perfusion=MAP>60?"Adequate organ perfusion ✅":MAP>50?"Marginal perfusion ⚠️":"Insufficient perfusion ❌";
          return{result:`MAP = ${MAP.toFixed(1)} mmHg\nSBP = ${SBP} mmHg | DBP = ${DBP} mmHg\nPulse pressure = ${pulse} mmHg\n${perfusion}`,steps:`MAP = ${DBP} + ⅓(${SBP}−${DBP}) = ${MAP.toFixed(1)} mmHg`};
        }
      },
      {
        id: "fick-diffusion", name: "Fick's Law of Diffusion",
        description: "J=−D×A×(dC/dx). Solves for diffusion rate, area, concentration gradient.",
        equation: "J = −D × A × ΔC/Δx",
        variables: [
          { id: "J", label: "Diffusion Rate (J)", unit: "mol/s" },
          { id: "D", label: "Diffusion Coefficient (D)", unit: "m²/s" },
          { id: "A", label: "Area (A)", unit: "m²" },
          { id: "dCdx", label: "Concentration Gradient (ΔC/Δx)", unit: "mol/m⁴" }
        ],
        calculate: (vals) => {
          const {J,D,A,dCdx}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oJ=J,oD=D,oA=A,oDCdx=dCdx,s="";
          if(J===undefined){oJ=D*A*dCdx;s:`J = D×A×ΔC/Δx = ${oJ.toExponential(4)} mol/s`;}
          else if(D===undefined){oD=J/(A*dCdx);s:`D = ${oD.toExponential(4)} m²/s`;}
          else if(A===undefined){oA=J/(D*dCdx);s:`A = ${oA.toExponential(4)} m²`;}
          else if(dCdx===undefined){oDCdx=J/(D*A);s:`ΔC/Δx = ${oDCdx.toExponential(4)} mol/m⁴`;}
          return{result:`J = ${oJ.toExponential(4)} mol/s\nD = ${oD.toExponential(4)} m²/s | A = ${oA.toExponential(4)} m²\nΔC/Δx = ${oDCdx.toExponential(4)} mol/m⁴`,steps:s};
        }
      },
      {
        id: "michaelis-menten", name: "Michaelis-Menten Kinetics",
        description: "v=Vmax[S]/(Km+[S]). Solves for velocity, Vmax, Km, or substrate concentration.",
        equation: "v = Vmax × [S] / (Km + [S])",
        variables: [
          { id: "v", label: "Reaction Velocity (v)", unit: "" },
          { id: "Vmax", label: "Maximum Velocity (Vmax)", unit: "" },
          { id: "S", label: "Substrate Conc [S]", unit: "" },
          { id: "Km", label: "Michaelis Constant (Km)", unit: "" }
        ],
        calculate: (vals) => {
          const {v,Vmax,S,Km}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let ov=v,oVmax=Vmax,oS=S,oKm=Km,s="";
          if(v===undefined){ov=Vmax*S/(Km+S);s:`v = Vmax×[S]/(Km+[S]) = ${ov.toFixed(4)}`;}
          else if(Vmax===undefined){oVmax=v*(Km+S)/S;s:`Vmax = v(Km+[S])/[S] = ${oVmax.toFixed(4)}`;}
          else if(Km===undefined){oKm=Vmax*S/v-S;s:`Km = Vmax[S]/v − [S] = ${oKm.toFixed(4)}`;}
          else if(S===undefined){oS=Km*v/(Vmax-v);if(oS<0)return{result:"Error: v cannot exceed Vmax.",steps:"Check inputs."};s:`[S] = Km×v/(Vmax−v) = ${oS.toFixed(4)}`;}
          const frac=ov/oVmax*100;
          return{result:`v = ${ov.toFixed(4)} (${frac.toFixed(1)}% of Vmax)\nVmax = ${oVmax.toFixed(4)} | [S] = ${oS.toFixed(4)} | Km = ${oKm.toFixed(4)}\nAt [S]=Km: v = Vmax/2`,steps:s};
        }
      },
      {
        id: "bacterial-growth", name: "Bacterial Doubling Time",
        description: "N=N₀×2^(t/td). Solves for population, initial, time, or doubling time.",
        equation: "N = N₀ × 2^(t/td)",
        variables: [
          { id: "N", label: "Final Population (N)", unit: "" },
          { id: "N0", label: "Initial Population (N₀)", unit: "" },
          { id: "t", label: "Time", unit: "min" },
          { id: "td", label: "Doubling Time (td)", unit: "min" }
        ],
        calculate: (vals) => {
          const {N,N0,t,td}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oN=N,oN0=N0,oT=t,oTd=td,s="";
          if(N===undefined){oN=N0*Math.pow(2,t/td);s:`N = ${oN.toExponential(4)}`;}
          else if(N0===undefined){oN0=N/Math.pow(2,t/td);s:`N₀ = ${oN0.toExponential(4)}`;}
          else if(td===undefined){const ratio=N/N0;if(ratio<=0)return{result:"Error: N/N₀ must be positive.",steps:"N and N₀ must be positive."};oTd=t*Math.LN2/Math.log(ratio);s:`td = ${oTd.toFixed(4)} min`;}
          else if(t===undefined){const ratio=N/N0;if(ratio<=0)return{result:"Error: N/N₀ must be positive.",steps:"N and N₀ must be positive."};oT=td*Math.log2(ratio);s:`t = ${oT.toFixed(4)} min`;}
          const gens=oT/oTd;
          return{result:`N = ${oN.toExponential(4)} | N₀ = ${oN0.toExponential(4)}\nt = ${oT.toFixed(2)} min | td = ${oTd.toFixed(2)} min\nGenerations = ${gens.toFixed(2)}`,steps:s};
        }
      },
      {
        id: "nernst-membrane", name: "Nernst Equation (Membrane)",
        description: "E=(RT/zF)×ln([ion]out/[ion]in). Equilibrium potential for an ion across membrane.",
        equation: "E = (RT/zF) × ln([ion]out/[ion]in)",
        variables: [
          { id: "E", label: "Equilibrium Potential", unit: "mV" },
          { id: "z", label: "Ion Charge (z)", unit: "" },
          { id: "out", label: "[Ion] outside", unit: "mM" },
          { id: "inn", label: "[Ion] inside", unit: "mM" },
          { id: "T", label: "Temperature", unit: "°C" }
        ],
        calculate: (vals) => {
          const R=8.314,F=96485;
          const {E,z,out,inn,T}=vals;
          if(z===0)return{result:"Error: z cannot be 0.",steps:"Enter ion charge."};
          const Tk=(T!==undefined?T:37)+273.15;
          const k=Object.keys(vals).length;
          if(out!==undefined&&inn!==undefined&&z!==undefined){
            const ratio=out/inn;
            if(ratio<=0)return{result:"Error: [out]/[in] must be positive for ln().",steps:"Concentrations must be positive."};
            const Ecalc=(R*Tk/(z*F))*Math.log(ratio)*1000;
            return{result:`E = ${Ecalc.toFixed(2)} mV\nz = ${z} | [out] = ${out} mM | [in] = ${inn} mM\nT = ${T||37}°C (${Tk.toFixed(1)} K)\nratio = ${ratio.toFixed(4)}`,steps:`E = (RT/zF)×ln([out]/[in]) × 1000\n= (${R}×${Tk.toFixed(1)}/(${z}×${F}))×ln(${ratio.toFixed(4)})×1000\n= ${Ecalc.toFixed(2)} mV`};
          }
          return{result:"Need z, [out], [in] (and optionally T).",steps:"Provide at least z, out, inn."};
        }
      },
      {
        id: "stroke-volume", name: "Stroke Volume & Ejection Fraction",
        description: "SV=EDV−ESV, EF=SV/EDV×100. Computes cardiac stroke volume and ejection fraction.",
        equation: "SV = EDV − ESV,  EF = SV/EDV × 100",
        variables: [
          { id: "EDV", label: "End Diastolic Volume", unit: "mL" },
          { id: "ESV", label: "End Systolic Volume", unit: "mL" }
        ],
        calculate: (vals) => {
          const {EDV,ESV}=vals;
          if(EDV===undefined||ESV===undefined)return{result:"Need EDV and ESV.",steps:"Provide both values."};
          const SV=EDV-ESV;
          const EF=SV/EDV*100;
          const efStatus=EF>=55?"Normal ✅":EF>=45?"Mildly reduced ⚠️":EF>=30?"Moderately reduced ⚠️":"Severely reduced ❌";
          return{result:`SV = ${SV.toFixed(0)} mL\nEF = ${EF.toFixed(1)}%\n${efStatus}\nEDV = ${EDV} mL | ESV = ${ESV} mL`,steps:`SV = EDV−ESV = ${EDV}−${ESV} = ${SV} mL\nEF = SV/EDV×100 = ${SV}/${EDV}×100 = ${EF.toFixed(1)}%`};
        }
      }
    ]
  },
  {
    category: "Electric Fields & Potential",
    icon: "Zap",
    formulas: [
      {
        id: "electric-field", name: "Electric Field (Point Charge)",
        description: "E=kQ/r². Solves for electric field, charge, or distance.",
        equation: "E = kQ/r²",
        variables: [
          { id: "E", label: "Electric Field", unit: "N/C" },
          { id: "Q", label: "Charge", unit: "C" },
          { id: "r", label: "Distance", unit: "m" }
        ],
        calculate: (vals) => {
          const k=8.99e9;
          const {E,Q,r}=vals;
          const kn=Object.keys(vals).length;
          if(kn<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oE=E,oQ=Q,oR=r,s="";
          if(E===undefined){oE=k*Q/(r*r);s:`E = kQ/r² = ${oE.toExponential(4)} N/C`;}
          else if(Q===undefined){oQ=E*r*r/k;s:`Q = Er²/k = ${oQ.toExponential(4)} C`;}
          else if(r===undefined){oR=Math.sqrt(k*Q/E);s:`r = √(kQ/E) = ${oR.toExponential(4)} m`;}
          return{result:`E = ${oE.toExponential(4)} N/C | Q = ${oQ.toExponential(4)} C | r = ${oR.toExponential(4)} m`,steps:s};
        }
      },
      {
        id: "electric-potential", name: "Electric Potential",
        description: "V=kQ/r. Solves for electric potential, charge, or distance.",
        equation: "V = kQ/r",
        variables: [
          { id: "V", label: "Electric Potential", unit: "V" },
          { id: "Q", label: "Charge", unit: "C" },
          { id: "r", label: "Distance", unit: "m" }
        ],
        calculate: (vals) => {
          const k=8.99e9;
          const {V,Q,r}=vals;
          const kn=Object.keys(vals).length;
          if(kn<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oV=V,oQ=Q,oR=r,s="";
          if(V===undefined){oV=k*Q/r;s:`V = kQ/r = ${oV.toExponential(4)} V`;}
          else if(Q===undefined){oQ=V*r/k;s:`Q = Vr/k = ${oQ.toExponential(4)} C`;}
          else if(r===undefined){oR=k*Q/V;s:`r = kQ/V = ${oR.toExponential(4)} m`;}
          return{result:`V = ${oV.toExponential(4)} V | Q = ${oQ.toExponential(4)} C | r = ${oR.toExponential(4)} m`,steps:s};
        }
      },
      {
        id: "parallel-plate-cap", name: "Parallel Plate Capacitor",
        description: "C=ε₀A/d. Solves for capacitance, plate area, or separation.",
        equation: "C = ε₀A/d",
        variables: [
          { id: "C", label: "Capacitance", unit: "F" },
          { id: "A", label: "Plate Area", unit: "m²" },
          { id: "d", label: "Plate Separation", unit: "m" }
        ],
        calculate: (vals) => {
          const e0=8.854e-12;
          const {C,A,d}=vals;
          const kn=Object.keys(vals).length;
          if(kn<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oC=C,oA=A,oD=d,s="";
          if(C===undefined){oC=e0*A/d;s:`C = ε₀A/d = ${oC.toExponential(4)} F`;}
          else if(A===undefined){oA=C*d/e0;s:`A = Cd/ε₀ = ${oA.toExponential(4)} m²`;}
          else if(d===undefined){oD=e0*A/C;s:`d = ε₀A/C = ${oD.toExponential(4)} m`;}
          return{result:`C = ${oC.toExponential(4)} F (${(oC*1e6).toFixed(4)} µF)\nA = ${oA.toExponential(4)} m² | d = ${oD.toExponential(4)} m`,steps:s};
        }
      },
      {
        id: "resistivity", name: "Resistance from Resistivity",
        description: "R=ρL/A. Solves for resistance, resistivity, length, or cross-section area.",
        equation: "R = ρL/A",
        variables: [
          { id: "R", label: "Resistance", unit: "Ω" },
          { id: "rho", label: "Resistivity (ρ)", unit: "Ω·m" },
          { id: "L", label: "Length", unit: "m" },
          { id: "A", label: "Cross-section Area", unit: "m²" }
        ],
        calculate: (vals) => {
          const {R,rho,L,A}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oR=R,oRho=rho,oL=L,oA=A,s="";
          if(R===undefined){oR=rho*L/A;s:`R = ρL/A = ${oR.toFixed(4)} Ω`;}
          else if(rho===undefined){oRho=R*A/L;s:`ρ = RA/L = ${oRho.toExponential(4)} Ω·m`;}
          else if(L===undefined){oL=R*A/rho;s:`L = RA/ρ = ${oL.toFixed(4)} m`;}
          else if(A===undefined){oA=rho*L/R;s:`A = ρL/R = ${oA.toExponential(4)} m²`;}
          return{result:`R = ${oR.toFixed(4)} Ω | ρ = ${oRho.toExponential(4)} Ω·m\nL = ${oL.toFixed(4)} m | A = ${oA.toExponential(4)} m²`,steps:s};
        }
      },
      {
        id: "series-parallel-cap", name: "Series/Parallel Capacitance",
        description: "Series: 1/Ct=Σ(1/Ci), Parallel: Ct=ΣCi. Computes equivalent capacitance.",
        equation: "Series: 1/Ct = 1/C₁+1/C₂+... | Parallel: Ct = C₁+C₂+...",
        variables: [
          { id: "type", label: "0=Series, 1=Parallel", unit: "" },
          { id: "c1", label: "C₁", unit: "F" },
          { id: "c2", label: "C₂", unit: "F" },
          { id: "c3", label: "C₃ (0 if none)", unit: "F" }
        ],
        calculate: (vals) => {
          const {type,c1,c2,c3}=vals;
          if(c1===undefined||c2===undefined)return{result:"Need at least C₁ and C₂.",steps:"Enter values."};
          const caps=[c1,c2,c3].filter(c=>c!==undefined&&c!==0);
          const isParallel=Math.round(type)===1;
          let Ct,s="";
          if(isParallel){Ct=caps.reduce((a,b)=>a+b,0);s=`Parallel: Ct = ${caps.join(" + ")} = ${Ct.toExponential(4)} F`;}
          else{const reciprocals=caps.map(c=>1/c);Ct=1/reciprocals.reduce((a,b)=>a+b,0);s=`Series: 1/Ct = ${caps.map(c=>`1/${c}`).join(" + ")}\nCt = ${Ct.toExponential(4)} F`;}
          return{result:`${isParallel?"Parallel":"Series"}: Ct = ${Ct.toExponential(4)} F (${(Ct*1e6).toFixed(4)} µF)\nCapacitors: ${caps.join(", ")} F`,steps:s};
        }
      },
      {
        id: "motional-emf", name: "Motional EMF",
        description: "EMF=BLv. Solves for induced EMF, field, length, or velocity of moving conductor.",
        equation: "EMF = BLv",
        variables: [
          { id: "emf", label: "Induced EMF", unit: "V" },
          { id: "B", label: "Magnetic Field", unit: "T" },
          { id: "L", label: "Conductor Length", unit: "m" },
          { id: "v", label: "Velocity", unit: "m/s" }
        ],
        calculate: (vals) => {
          const {emf,B,L,v}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oEmf=emf,oB=B,oL=L,oV=v,s="";
          if(emf===undefined){oEmf=B*L*v;s:`EMF = BLv = ${B}×${L}×${v} = ${oEmf.toFixed(4)} V`;}
          else if(B===undefined){oB=emf/(L*v);s:`B = EMF/(Lv) = ${oB.toFixed(4)} T`;}
          else if(L===undefined){oL=emf/(B*v);s:`L = EMF/(Bv) = ${oL.toFixed(4)} m`;}
          else if(v===undefined){oV=emf/(B*L);s:`v = EMF/(BL) = ${oV.toFixed(4)} m/s`;}
          const power=oEmf*oEmf/(oB*oB*oL*oL*0.1);
          return{result:`EMF = ${oEmf.toFixed(4)} V | B = ${oB.toFixed(4)} T\nL = ${oL.toFixed(4)} m | v = ${oV.toFixed(4)} m/s`,steps:s};
        }
      }
    ]
  },
  {
    category: "Advanced Chemistry",
    icon: "Calculator",
    formulas: [
      {
        id: "molality", name: "Molality",
        description: "m=n/kg(solvent). Solves for molality, moles, or solvent mass.",
        equation: "m = n / kg(solvent)",
        variables: [
          { id: "m", label: "Molality", unit: "mol/kg" },
          { id: "n", label: "Moles of Solute", unit: "mol" },
          { id: "kg", label: "Solvent Mass", unit: "kg" }
        ],
        calculate: (vals) => {
          const {m,n,kg}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oM=m,oN=n,oKg=kg,s="";
          if(m===undefined){oM=n/kg;s:`m = n/kg = ${oM.toFixed(4)} mol/kg`;}
          else if(n===undefined){oN=m*kg;s:`n = m×kg = ${oN.toFixed(4)} mol`;}
          else if(kg===undefined){oKg=n/m;s:`kg = n/m = ${oKg.toFixed(4)} kg`;}
          return{result:`Molality = ${oM.toFixed(4)} mol/kg | n = ${oN.toFixed(4)} mol | kg = ${oKg.toFixed(4)} kg`,steps:s};
        }
      },
      {
        id: "dalton-law", name: "Dalton's Law of Partial Pressures",
        description: "P_total=P₁+P₂+P₃. Solves for total pressure or any partial pressure.",
        equation: "P_total = P₁ + P₂ + P₃",
        variables: [
          { id: "Pt", label: "Total Pressure", unit: "atm" },
          { id: "P1", label: "Partial Pressure P₁", unit: "atm" },
          { id: "P2", label: "Partial Pressure P₂", unit: "atm" },
          { id: "P3", label: "Partial Pressure P₃", unit: "atm" }
        ],
        calculate: (vals) => {
          const {Pt,P1,P2,P3}=vals;
          const known=Object.entries(vals).filter(([k,v])=>v!==undefined);
          if(known.length<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values."};
          let oPt=Pt,oP1=P1,oP2=P2,oP3=P3,s="";
          if(Pt===undefined){oPt=(P1||0)+(P2||0)+(P3||0);s:`P_total = ${oPt.toFixed(4)} atm`;}
          else if(P1===undefined){oP1=Pt-(P2||0)-(P3||0);s:`P₁ = ${oP1.toFixed(4)} atm`;}
          else if(P2===undefined){oP2=Pt-P1-(P3||0);s:`P₂ = ${oP2.toFixed(4)} atm`;}
          else if(P3===undefined){oP3=Pt-P1-P2;s:`P₃ = ${oP3.toFixed(4)} atm`;}
          return{result:`P_total = ${oPt.toFixed(4)} atm\nP₁ = ${oP1.toFixed(4)} | P₂ = ${oP2.toFixed(4)} | P₃ = ${oP3.toFixed(4)} atm`,steps:s};
        }
      },
      {
        id: "rms-speed", name: "RMS Speed of Gas Molecules",
        description: "vrms=√(3RT/M). Solves for RMS speed, temperature, or molar mass.",
        equation: "v_rms = √(3RT/M)",
        variables: [
          { id: "v", label: "RMS Speed", unit: "m/s" },
          { id: "T", label: "Temperature", unit: "K" },
          { id: "M", label: "Molar Mass (kg/mol)", unit: "kg/mol" }
        ],
        calculate: (vals) => {
          const R=8.314;
          const {v,T,M}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oV=v,oT=T,oM=M,s="";
          if(v===undefined){oV=Math.sqrt(3*R*T/M);s:`vrms = √(3RT/M) = ${oV.toFixed(2)} m/s`;}
          else if(T===undefined){oT=v*v*M/(3*R);s:`T = v²M/(3R) = ${oT.toFixed(2)} K`;}
          else if(M===undefined){oM=3*R*T/(v*v);s:`M = 3RT/v² = ${oM.toExponential(4)} kg/mol`;}
          const KE=1.5*R*oT;
          return{result:`vrms = ${oV.toFixed(2)} m/s (${(oV*3.6).toFixed(2)} km/h)\nT = ${oT.toFixed(2)} K | M = ${oM.toExponential(4)} kg/mol\nAvg KE per mole = ${KE.toFixed(2)} J/mol`,steps:s};
        }
      },
      {
        id: "van-der-waals", name: "Van der Waals Equation",
        description: "(P+n²a/V²)(V−nb)=nRT. Corrects ideal gas for real behavior.",
        equation: "(P + n²a/V²)(V − nb) = nRT",
        variables: [
          { id: "P", label: "Pressure", unit: "atm" },
          { id: "V", label: "Volume", unit: "L" },
          { id: "n", label: "Moles", unit: "mol" },
          { id: "T", label: "Temperature", unit: "K" },
          { id: "a", label: "Van der Waals a", unit: "L²·atm/mol²" },
          { id: "b", label: "Van der Waals b", unit: "L/mol" }
        ],
        calculate: (vals) => {
          const R=0.08206;
          const {P,V,n,T,a,b}=vals;
          if(!n||!T)return{result:"Need n and T at minimum.",steps:"Provide moles and temperature."};
          const oP=P,oV=V;
          if(P===undefined&&V!==undefined&&a!==undefined&&b!==undefined){
            const pIdeal=n*R*T/V;
            const pReal=n*R*T/(V-n*b)-n*n*a/(V*V);
            return{result:`Real gas P = ${pReal.toFixed(4)} atm\nIdeal gas P = ${pIdeal.toFixed(4)} atm\nDeviation = ${((pReal-pIdeal)/pIdeal*100).toFixed(4)}%`,steps:`P = nRT/(V−nb) − n²a/V²\n= ${pReal.toFixed(4)} atm`};
          }
          if(V===undefined&&P!==undefined&&a!==undefined&&b!==undefined){
            const vIdeal=n*R*T/P;
            return{result:`Solving for V with Van der Waals requires iteration.\nIdeal gas estimate: V = ${vIdeal.toFixed(4)} L`,steps:`V_ideal = nRT/P = ${vIdeal.toFixed(4)} L`};
          }
          return{result:"Need P or V plus n, T, a, b.",steps:"Provide 5 of 6 values."};
        }
      },
      {
        id: "mass-percent", name: "Mass Percent & PPM",
        description: "Computes mass percent, parts per million, and mole fraction.",
        equation: "% = (mass_solute / mass_solution) × 100",
        variables: [
          { id: "ms", label: "Mass of Solute", unit: "g" },
          { id: "mt", label: "Mass of Solution", unit: "g" }
        ],
        calculate: (vals) => {
          const {ms,mt}=vals;
          if(ms===undefined||mt===undefined)return{result:"Need both masses.",steps:"Enter solute and solution mass."};
          if(mt<ms)return{result:"Error: Solution mass must be ≥ solute mass.",steps:"Check values."};
          const massPct=ms/mt*100;
          const ppm=ms/mt*1e6;
          const ppb=ms/mt*1e9;
          const solvent=mt-ms;
          return{result:`Mass percent = ${massPct.toFixed(4)}%\nPPM = ${ppm.toFixed(2)} ppm\nPPB = ${ppb.toFixed(2)} ppb\nSolute = ${ms} g | Solvent = ${solvent} g`,steps:`% = (${ms}/${mt})×100 = ${massPct.toFixed(4)}%`};
        }
      }
    ]
  },
  {
    category: "Ecology & Environmental",
    icon: "Calculator",
    formulas: [
      {
        id: "chi-square", name: "Chi-Square Test",
        description: "χ²=Σ(O−E)²/E. Computes chi-square statistic from observed and expected values.",
        equation: "χ² = Σ(O−E)²/E",
        variables: [
          { id: "observed", label: "Observed (comma-sep)", unit: "" },
          { id: "expected", label: "Expected (comma-sep)", unit: "" }
        ],
        calculate: (vals) => {
          const {observed,expected}=vals;
          if(!observed||!expected)return{result:"Enter observed and expected values.",steps:"Comma-separated."};
          const O=String(observed).split(",").map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
          const E=String(expected).split(",").map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
          if(O.length!==E.length||O.length<2)return{result:`Error: Need equal counts (got ${O.length} obs, ${E.length} exp).`,steps:"Check data."};
          let chi2=0,s=`O: [${O.join(", ")}]\nE: [${E.join(", ")}]\n`;
          for(let i=0;i<O.length;i++){const term=(O[i]-E[i])**2/E[i];chi2+=term;s+=`(${O[i]}−${E[i]})²/${E[i]} = ${term.toFixed(4)}\n`;}
          const df=O.length-1;
          return{result:`χ² = ${chi2.toFixed(4)}\ndf = ${df}\nCompare to critical value for significance.`,steps:s+`χ² = ${chi2.toFixed(4)}`};
        }
      },
      {
        id: "shannon-index", name: "Shannon-Wiener Diversity Index",
        description: "H'=−Σ(pi×ln(pi)). Computes species diversity from proportions.",
        equation: "H' = −Σ(pi × ln(pi))",
        variables: [
          { id: "data", label: "Species counts (comma-sep)", unit: "" }
        ],
        calculate: (vals) => {
          const raw=vals["data"];
          if(!raw)return{result:"Enter species counts.",steps:"e.g. 10, 20, 30, 15"};
          const nums=String(raw).split(",").map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n)&&n>0);
          if(nums.length<2)return{result:"Need at least 2 species.",steps:"Enter more data."};
          const total=nums.reduce((a,b)=>a+b,0);
          let H=0,s="";
          nums.forEach((n,i)=>{const p=n/total;if(p>0){H-=p*Math.log(p);s+=`p${i+1}=${p.toFixed(4)}, ln(p)=${Math.log(p).toFixed(4)}, p×ln(p)=${(p*Math.log(p)).toFixed(4)}\n`;}});
          const Hmax=Math.log(nums.length);
          const evenness=Hmax>0?H/Hmax:0;
          return{result:`H\' = ${H.toFixed(4)}\nH_max = ln(S) = ln(${nums.length}) = ${Hmax.toFixed(4)}\nEvenness (J) = H\'/H_max = ${evenness.toFixed(4)}\nS = ${nums.length} species | Total = ${total}`,steps:s};
        }
      },
      {
        id: "rule-of-70", name: "Rule of 70 (Doubling Time)",
        description: "td=70/r. Quick estimate of doubling time from growth rate percentage.",
        equation: "td = 70 / r%",
        variables: [
          { id: "td", label: "Doubling Time", unit: "years" },
          { id: "r", label: "Growth Rate (%)", unit: "%" }
        ],
        calculate: (vals) => {
          const {td,r}=vals;
          if(td===undefined&&r===undefined)return{result:"Need either td or r.",steps:"Provide 1 value."};
          let oTd=td,oR=r,s="";
          if(td===undefined){oTd=70/r;s:`td = 70/${r} = ${oTd.toFixed(2)} years`;}
          else if(r===undefined){oR=70/td;s:`r = 70/${td} = ${oR.toFixed(2)}%`;}
          const exact=Math.LN2/(oR/100);
          return{result:`Doubling time ≈ ${oTd.toFixed(2)} years\nGrowth rate = ${oR.toFixed(2)}%\nExact doubling = ln(2)/r = ${exact.toFixed(2)} years\nRule of 70 error = ${Math.abs(oTd-exact).toFixed(2)} years`,steps:s};
        }
      },
      {
        id: "npp", name: "Net Primary Productivity",
        description: "NPP=GPP−R. Solves for net primary productivity, gross, or respiration.",
        equation: "NPP = GPP − R",
        variables: [
          { id: "NPP", label: "Net Primary Productivity", unit: "g/m²/yr" },
          { id: "GPP", label: "Gross Primary Productivity", unit: "g/m²/yr" },
          { id: "R", label: "Respiration", unit: "g/m²/yr" }
        ],
        calculate: (vals) => {
          const {NPP,GPP,R}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oNPP=NPP,oGPP=GPP,oR=R,s="";
          if(NPP===undefined){oNPP=GPP-R;s:`NPP = GPP−R = ${GPP}−${R} = ${oNPP.toFixed(2)} g/m²/yr`;}
          else if(GPP===undefined){oGPP=NPP+R;s:`GPP = NPP+R = ${oGPP.toFixed(2)} g/m²/yr`;}
          else if(R===undefined){oR=GPP-NPP;s:`R = GPP−NPP = ${oR.toFixed(2)} g/m²/yr`;}
          const eff=oGPP>0?(oNPP/oGPP*100).toFixed(2):"N/A";
          return{result:`NPP = ${oNPP.toFixed(2)} | GPP = ${oGPP.toFixed(2)} | R = ${oR.toFixed(2)} g/m²/yr\nNPP/GPP efficiency = ${eff}%`,steps:s};
        }
      },
      {
        id: "cell-sa-vol", name: "Cell SA:Volume Ratio",
        description: "Computes surface area to volume ratio for spherical and cuboidal cells.",
        equation: "SA/V ratio (sphere) = 3/r",
        variables: [
          { id: "r", label: "Radius (sphere) or Side (cube)", unit: "µm" }
        ],
        calculate: (vals) => {
          const {r}=vals;
          if(r===undefined)return{result:"Enter radius or side length.",steps:"Provide the value."};
          const saSphere=4*Math.PI*r*r;
          const volSphere=4/3*Math.PI*r*r*r;
          const ratioSphere=saSphere/volSphere;
          const saCube=6*r*r;
          const volCube=r*r*r;
          const ratioCube=saCube/volCube;
          return{result:`Sphere: SA=${saSphere.toFixed(2)} µm², V=${volSphere.toFixed(2)} µm³, SA/V=${ratioSphere.toFixed(4)}\nCube: SA=${saCube.toFixed(2)} µm², V=${volCube.toFixed(2)} µm³, SA/V=${ratioCube.toFixed(4)}\n\nAs size increases, SA/V decreases → limits cell size`,steps:`SA/V (sphere) = 3/r = ${ratioSphere.toFixed(4)}\nSA/V (cube) = 6/side = ${ratioCube.toFixed(4)}`};
        }
      },
      {
        id: "q10", name: "Q10 Temperature Coefficient",
        description: "Q10=(R2/R1)^(10/(T2-T1)). Measures metabolic rate change with temperature.",
        equation: "Q₁₀ = (R₂/R₁)^(10/(T₂−T₁))",
        variables: [
          { id: "Q10", label: "Q10", unit: "" },
          { id: "R1", label: "Rate at T₁ (R₁)", unit: "" },
          { id: "R2", label: "Rate at T₂ (R₂)", unit: "" },
          { id: "T1", label: "Temperature 1 (T₁)", unit: "°C" },
          { id: "T2", label: "Temperature 2 (T₂)", unit: "°C" }
        ],
        calculate: (vals) => {
          const {Q10,R1,R2,T1,T2}=vals;
          const k=Object.keys(vals).length;
          if(k<4)return{result:"Need at least 4 of 5.",steps:"Provide 4 values."};
          let oQ10=Q10,oR1=R1,oR2=R2,oT1=T1,oT2=T2,s="";
          const dT=Math.abs(oT2-oT1);
          if(dT===0)return{result:"Error: T1 = T2.",steps:"Temperatures must differ."};
          if(Q10===undefined){oQ10=Math.pow(R2/R1,10/dT);s:`Q10 = (${R2}/${R1})^(10/${dT}) = ${oQ10.toFixed(4)}`;}
          else if(R2===undefined){oR2=R1*Math.pow(oQ10,dT/10);s:`R₂ = R₁×Q10^((T₂−T₁)/10) = ${oR2.toFixed(4)}`;}
          else if(R1===undefined){oR1=R2/Math.pow(oQ10,dT/10);s:`R₁ = ${oR1.toFixed(4)}`;}
          return{result:`Q10 = ${oQ10.toFixed(4)}\nR₁ = ${oR1.toFixed(4)} at T₁ = ${oT1}°C\nR₂ = ${oR2.toFixed(4)} at T₂ = ${oT2}°C\n${oQ10>1?"Rate increases with temp":oQ10<1?"Rate decreases with temp":"Rate unchanged"}`,steps:s};
        }
      }
    ]
  },
  {
    category: "More Mathematics",
    icon: "Calculator",
    formulas: [
      {
        id: "distance-3d", name: "3D Distance Formula",
        description: "d=√((x₂-x₁)²+(y₂-y₁)²+(z₂-z₁)²). Solves for distance or any coordinate.",
        equation: "d = √(Δx² + Δy² + Δz²)",
        variables: [
          { id: "d", label: "Distance", unit: "" },
          { id: "x1", label: "x₁", unit: "" },
          { id: "y1", label: "y₁", unit: "" },
          { id: "z1", label: "z₁", unit: "" },
          { id: "x2", label: "x₂", unit: "" },
          { id: "y2", label: "y₂", unit: "" },
          { id: "z2", label: "z₂", unit: "" }
        ],
        calculate: (vals) => {
          const {d,x1,y1,z1,x2,y2,z2}=vals;
          if(d!==undefined&&x1!==undefined&&y1!==undefined&&z1!==undefined&&x2!==undefined&&y2!==undefined&&z2!==undefined){
            const calc=Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2);
            return{result:`Calculated: ${calc.toFixed(4)}\nGiven: ${d}`,steps:`d = √((${x2}−${x1})²+(${y2}−${y1})²+(${z2}−${z1})²) = ${calc.toFixed(4)}`};
          }
          if(d===undefined&&x1!==undefined&&y1!==undefined&&z1!==undefined&&x2!==undefined&&y2!==undefined&&z2!==undefined){
            const dist=Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2);
            return{result:`d = ${dist.toFixed(4)}`,steps:`√((${x2}−${x1})²+(${y2}−${y1})²+(${z2}−${z1})²) = ${dist.toFixed(4)}`};
          }
          return{result:"Need all 7 values (or d + 6 coords).",steps:"Provide all coordinates."};
        }
      },
      {
        id: "change-of-base", name: "Change of Base (Logarithm)",
        description: "log_b(x) = log_a(x)/log_a(b). Converts between log bases.",
        equation: "log_b(x) = ln(x)/ln(b)",
        variables: [
          { id: "result", label: "log_b(x) result", unit: "" },
          { id: "x", label: "Argument (x)", unit: "" },
          { id: "b", label: "Base (b)", unit: "" }
        ],
        calculate: (vals) => {
          const {result,x,b}=vals;
          const k=Object.keys(vals).length;
          if(k<2)return{result:"Need at least 2 of 3.",steps:"Provide 2 values."};
          let oR=result,oX=x,oB=b,s="";
          if(result===undefined){if(x<=0||b<=0||b===1)return{result:"Error: x>0, b>0, b≠1 required.",steps:"Logarithm domain error."};oR=Math.log(x)/Math.log(b);s:`log_${b}(${x}) = ln(${x})/ln(${b}) = ${oR.toFixed(6)}`;}
          else if(x===undefined){if(b<=0)return{result:"Error: b must be positive.",steps:"Base must be > 0."};oX=Math.pow(b,result);s:`x = b^result = ${b}^${result} = ${oX.toFixed(6)}`;}
          else if(b===undefined){if(x<=0||result===0)return{result:"Error: x>0 and result≠0 required.",steps:"Cannot solve for base."};oB=Math.pow(x,1/result);s:`b = x^(1/result) = ${oB.toFixed(6)}`;}
          const log10=oX?Math.log10(oX):0;
          const ln=oX?Math.log(oX):0;
          return{result:`log_${oB}(${oX}) = ${oR.toFixed(6)}\nlog₁₀(${oX}) = ${log10.toFixed(6)}\nln(${oX}) = ${ln.toFixed(6)}`,steps:s};
        }
      },
      {
        id: "slope-intercept", name: "Slope-Intercept Form",
        description: "y=mx+b. Generates equation from slope and y-intercept. Evaluates at any x.",
        equation: "y = mx + b",
        variables: [
          { id: "m", label: "Slope (m)", unit: "" },
          { id: "b", label: "Y-intercept (b)", unit: "" },
          { id: "x", label: "X value (to evaluate)", unit: "" }
        ],
        calculate: (vals) => {
          const {m,b,x}=vals;
          if(m===undefined||b===undefined)return{result:"Need slope (m) and intercept (b).",steps:"Provide m and b."};
          let s=`Equation: y = ${m}x ${b>=0?"+ ":"− "}${Math.abs(b)}\n`;
          let resultStr=`y = ${m}x ${b>=0?"+ ":"− "}${Math.abs(b)}\nY-intercept: (0, ${b})\nX-intercept: (${m!==0?(-b/m).toFixed(4):"none"}, 0)\nSlope = ${m}`;
          if(x!==undefined){
            const y=m*x+b;
            resultStr+=`\n\nAt x=${x}: y = ${y.toFixed(4)}`;
            s+=`y(${x}) = ${m}×${x} + ${b} = ${y.toFixed(4)}`;
          }
          return{result:resultStr,steps:s};
        }
      },
      {
        id: "matrix-3x3", name: "Matrix 3×3 Determinant",
        description: "Computes determinant of a 3×3 matrix using cofactor expansion.",
        equation: "det = a(ei−fh) − b(di−fg) + c(dh−eg)",
        variables: [
          { id: "a", label: "a", unit: "" },{ id: "b", label: "b", unit: "" },{ id: "c", label: "c", unit: "" },
          { id: "d", label: "d", unit: "" },{ id: "e", label: "e", unit: "" },{ id: "f", label: "f", unit: "" },
          { id: "g", label: "g", unit: "" },{ id: "h", label: "h", unit: "" },{ id: "i", label: "i", unit: "" }
        ],
        calculate: (vals) => {
          const {a,b,c,d,e,f,g,h,i}=vals;
          if(a===undefined||b===undefined||c===undefined||d===undefined||e===undefined||f===undefined||g===undefined||h===undefined||i===undefined)
            return{result:"Need all 9 elements.",steps:"Enter a through i."};
          const det=a*(e*i-f*h)-b*(d*i-f*g)+c*(d*h-e*g);
          const trace=a+e+i;
          return{result:`det(A) = ${det.toFixed(4)}\nTrace = ${trace.toFixed(4)}\n${Math.abs(det)<1e-10?"⚠️ Singular matrix (det≈0)":"Non-singular matrix"}`,steps:`det = ${a}(${e}×${i}−${f}×${h}) − ${b}(${d}×${i}−${f}×${g}) + ${c}(${d}×${h}−${e}×${g})\n= ${det.toFixed(4)}`};
        }
      }
    ]
  },
  {
    category: "Area & Volume Shapes",
    icon: "Calculator",
    formulas: [
      {
        id: "triangle-bh", name: "Triangle Area (Base × Height)",
        description: "A=½bh. Solves for area, base, or height.",
        equation: "A = ½bh",
        variables: [
          { id: "A", label: "Area", unit: "m²" },
          { id: "b", label: "Base", unit: "m" },
          { id: "h", label: "Height", unit: "m" }
        ],
        calculate: (vals) => {
          const {A,b,h}=vals;const k=Object.keys(vals).length;if(k<2)return{result:"Need 2 of 3.",steps:""};
          let oA=A,ob=b,oh=h,s="";
          if(A===undefined){oA=0.5*b*h;s=`A = ½×${b}×${h} = ${oA.toFixed(4)} m²`;}
          else if(b===undefined){ob=2*A/h;s:`b = 2A/h = ${ob.toFixed(4)} m`;}
          else if(h===undefined){oh=2*A/b;s:`h = 2A/b = ${oh.toFixed(4)} m`;}
          return{result:`A = ${oA.toFixed(4)} m² | b = ${ob.toFixed(4)} m | h = ${oh.toFixed(4)} m`,steps:s};
        }
      },
      {
        id: "trapezoid", name: "Trapezoid Area",
        description: "A=½(a+b)h. Solves for area, either base, or height.",
        equation: "A = ½(a+b)h",
        variables: [
          { id: "A", label: "Area", unit: "m²" },
          { id: "a", label: "Base a (top)", unit: "m" },
          { id: "b", label: "Base b (bottom)", unit: "m" },
          { id: "h", label: "Height", unit: "m" }
        ],
        calculate: (vals) => {
          const {A,a,b,h}=vals;const k=Object.keys(vals).length;if(k<3)return{result:"Need 3 of 4.",steps:""};
          let oA=A,oa=a,ob=b,oh=h,s="";
          if(A===undefined){oA=0.5*(a+b)*h;s=`A = ½(${a}+${b})×${h} = ${oA.toFixed(4)}`;}
          else if(h===undefined){oh=2*A/(a+b);s:`h = 2A/(a+b) = ${oh.toFixed(4)}`;}
          else if(a===undefined){oa=2*A/h-b;s:`a = ${oa.toFixed(4)}`;}
          else if(b===undefined){ob=2*A/h-a;s:`b = ${ob.toFixed(4)}`;}
          return{result:`A = ${oA.toFixed(4)} m² | a = ${oa.toFixed(4)} | b = ${ob.toFixed(4)} | h = ${oh.toFixed(4)}`,steps:s};
        }
      },
      {
        id: "rect-prism", name: "Rectangular Prism (Box)",
        description: "V=lwh, SA=2(lw+lh+wh). Computes volume and surface area.",
        equation: "V = lwh",
        variables: [
          { id: "l", label: "Length", unit: "m" },
          { id: "w", label: "Width", unit: "m" },
          { id: "h", label: "Height", unit: "m" }
        ],
        calculate: (vals) => {
          const {l,w,h}=vals;
          if(l===undefined||w===undefined||h===undefined)return{result:"Need all 3 dimensions.",steps:""};
          const V=l*w*h;
          const SA=2*(l*w+l*h+w*h);
          const diag=Math.sqrt(l*l+w*w+h*h);
          return{result:`Volume = ${V.toFixed(4)} m³\nSurface Area = ${SA.toFixed(4)} m²\nSpace Diagonal = ${diag.toFixed(4)} m`,steps:`V = ${l}×${w}×${h} = ${V.toFixed(4)}\nSA = 2(${l}×${w}+${l}×${h}+${w}×${h}) = ${SA.toFixed(4)}`};
        }
      },
      {
        id: "pyramid", name: "Pyramid Volume",
        description: "V=⅓Bh. Computes pyramid volume from base area and height.",
        equation: "V = ⅓Bh",
        variables: [
          { id: "V", label: "Volume", unit: "m³" },
          { id: "B", label: "Base Area", unit: "m²" },
          { id: "h", label: "Height", unit: "m" }
        ],
        calculate: (vals) => {
          const {V,B,h}=vals;const k=Object.keys(vals).length;if(k<2)return{result:"Need 2 of 3.",steps:""};
          let oV=V,oB=B,oh=h,s="";
          if(V===undefined){oV=B*h/3;s:`V = ⅓Bh = ${oV.toFixed(4)} m³`;}
          else if(B===undefined){oB=3*V/h;s:`B = 3V/h = ${oB.toFixed(4)} m²`;}
          else if(h===undefined){oh=3*V/B;s:`h = 3V/B = ${oh.toFixed(4)} m`;}
          return{result:`V = ${oV.toFixed(4)} m³ | B = ${oB.toFixed(4)} m² | h = ${oh.toFixed(4)} m`,steps:s};
        }
      },
      {
        id: "hemisphere", name: "Hemisphere Volume & Surface",
        description: "V=⅔πr³, A=3πr². Computes hemisphere volume and surface area.",
        equation: "V = ⅔πr³",
        variables: [
          { id: "r", label: "Radius", unit: "m" }
        ],
        calculate: (vals) => {
          const {r}=vals;if(r===undefined)return{result:"Enter radius.",steps:""};
          const V=2/3*Math.PI*r*r*r;
          const curvedSA=2*Math.PI*r*r;
          const totalSA=3*Math.PI*r*r;
          return{result:`Volume = ${V.toFixed(4)} m³\nCurved SA = ${curvedSA.toFixed(4)} m²\nTotal SA (incl. base) = ${totalSA.toFixed(4)} m²`,steps:`V = ⅔πr³ = ${V.toFixed(4)}`};
        }
      },
      {
        id: "ellipse", name: "Ellipse Area",
        description: "A=πab. Solves for area, semi-major, or semi-minor axis.",
        equation: "A = πab",
        variables: [
          { id: "A", label: "Area", unit: "m²" },
          { id: "a", label: "Semi-major (a)", unit: "m" },
          { id: "b", label: "Semi-minor (b)", unit: "m" }
        ],
        calculate: (vals) => {
          const {A,a,b}=vals;const k=Object.keys(vals).length;if(k<2)return{result:"Need 2 of 3.",steps:""};
          let oA=A,oa=a,ob=b,s="";
          if(A===undefined){oA=Math.PI*a*b;s:`A = π×${a}×${b} = ${oA.toFixed(4)}`;}
          else if(a===undefined){oa=A/(Math.PI*b);s:`a = ${oa.toFixed(4)}`;}
          else if(b===undefined){ob=A/(Math.PI*a);s:`b = ${ob.toFixed(4)}`;}
          const circ=Math.PI*(3*(oa+ob)-Math.sqrt((3*oa+ob)*(oa+3*ob)));
          return{result:`Area = ${oA.toFixed(4)} m² | a = ${oa.toFixed(4)} m | b = ${ob.toFixed(4)} m\nApprox perimeter ≈ ${circ.toFixed(4)} m`,steps:s};
        }
      },
      {
        id: "parallelogram", name: "Parallelogram Area",
        description: "A=bh. Solves for area, base, or height.",
        equation: "A = bh",
        variables: [
          { id: "A", label: "Area", unit: "m²" },
          { id: "b", label: "Base", unit: "m" },
          { id: "h", label: "Height", unit: "m" }
        ],
        calculate: (vals) => {
          const {A,b,h}=vals;const k=Object.keys(vals).length;if(k<2)return{result:"Need 2 of 3.",steps:""};
          let oA=A,ob=b,oh=h,s="";
          if(A===undefined){oA=b*h;s:`A = ${b}×${h} = ${oA.toFixed(4)}`;}
          else if(b===undefined){ob=A/h;s:`b = ${ob.toFixed(4)}`;}
          else if(h===undefined){oh=A/b;s:`h = ${oh.toFixed(4)}`;}
          return{result:`A = ${oA.toFixed(4)} m² | b = ${ob.toFixed(4)} m | h = ${oh.toFixed(4)} m`,steps:s};
        }
      }
    ]
  },
  {
    category: "Final Physics Essentials",
    icon: "Cog",
    formulas: [
      {
        id: "wave-string", name: "Wave on a String",
        description: "v=√(T/μ). Solves for wave speed, tension, or linear mass density.",
        equation: "v = √(T/μ)",
        variables: [
          { id: "v", label: "Wave Speed", unit: "m/s" },
          { id: "T", label: "Tension", unit: "N" },
          { id: "mu", label: "Linear Density (μ)", unit: "kg/m" }
        ],
        calculate: (vals) => {
          const {v,T,mu}=vals;const k=Object.keys(vals).length;if(k<2)return{result:"Need 2 of 3.",steps:""};
          let oV=v,oT=T,oMu=mu,s="";
          if(v===undefined){oV=Math.sqrt(T/mu);s:`v = √(T/μ) = ${oV.toFixed(4)} m/s`;}
          else if(T===undefined){oT=v*v*mu;s:`T = v²μ = ${oT.toFixed(4)} N`;}
          else if(mu===undefined){oMu=T/(v*v);s:`μ = T/v² = ${oMu.toExponential(4)} kg/m`;}
          return{result:`v = ${oV.toFixed(4)} m/s | T = ${oT.toFixed(4)} N | μ = ${oMu.toExponential(4)} kg/m`,steps:s};
        }
      },
      {
        id: "refraction-index", name: "Index of Refraction",
        description: "n=c/v. Solves for refractive index, speed of light in medium.",
        equation: "n = c/v",
        variables: [
          { id: "n", label: "Refractive Index (n)", unit: "" },
          { id: "v", label: "Speed in Medium", unit: "m/s" }
        ],
        calculate: (vals) => {
          const c=3e8;const {n,v}=vals;
          if(n===undefined&&v===undefined)return{result:"Need n or v.",steps:""};
          if(n===undefined){return{result:`n = c/v = 3×10⁸/${v} = ${(c/v).toFixed(4)}`,steps:`n = ${c}/${v}`};}
          return{result:`n = ${n}\nv = c/n = ${(c/n).toExponential(4)} m/s\nSpeed reduction = ${(100*(1-1/n)).toFixed(2)}%`,steps:`v = c/n = ${(c/n).toExponential(4)}`};
        }
      },
      {
        id: "magnification", name: "Optical Magnification",
        description: "m=-di/do. Computes magnification, image height, and orientation.",
        equation: "m = -dᵢ/dₒ = hᵢ/hₒ",
        variables: [
          { id: "di", label: "Image Distance (dᵢ)", unit: "m" },
          { id: "do", label: "Object Distance (dₒ)", unit: "m" },
          { id: "ho", label: "Object Height (hₒ)", unit: "m" }
        ],
        calculate: (vals) => {
          const {di,do:do_,ho}=vals;
          if(di===undefined||do_===undefined)return{result:"Need dᵢ and dₒ.",steps:""};
          const m=-di/do_;
          const hi=ho!==undefined?m*ho:undefined;
          const orient=m>0?"Upright":m<0?"Inverted":"Same size";
          const size=Math.abs(m)>1?"Magnified":Math.abs(m)<1?"Diminished":"Same size";
          return{result:`m = ${m.toFixed(4)}\n${orient}, ${size}\n|m| = ${Math.abs(m).toFixed(4)}${hi!==undefined?`\nhᵢ = ${hi.toFixed(4)} m`:``}`,steps:`m = −dᵢ/dₒ = −${di}/${do_} = ${m.toFixed(4)}`};
        }
      },
      {
        id: "isobaric-work", name: "Isobaric Work (Gas)",
        description: "W=PΔV. Solves for work done by gas, pressure, or volume change.",
        equation: "W = PΔV",
        variables: [
          { id: "W", label: "Work", unit: "J" },
          { id: "P", label: "Pressure", unit: "Pa" },
          { id: "dV", label: "Volume Change (ΔV)", unit: "m³" }
        ],
        calculate: (vals) => {
          const {W,P,dV}=vals;const k=Object.keys(vals).length;if(k<2)return{result:"Need 2 of 3.",steps:""};
          let oW=W,oP=P,oDV=dV,s="";
          if(W===undefined){oW=P*dV;s:`W = PΔV = ${P}×${dV} = ${oW.toFixed(4)} J`;}
          else if(P===undefined){oP=W/dV;s:`P = W/ΔV = ${oP.toFixed(4)} Pa`;}
          else if(dV===undefined){oDV=W/P;s:`ΔV = W/P = ${oDV.toFixed(6)} m³`;}
          return{result:`W = ${oW.toFixed(4)} J | P = ${oP.toFixed(4)} Pa | ΔV = ${oDV.toFixed(6)} m³\n${oW>0?"Gas expands (work done BY gas)":oW<0?"Gas compressed (work done ON gas)":"No volume change"}`,steps:s};
        }
      },
      {
        id: "parallel-axis", name: "Parallel Axis Theorem",
        description: "I=Icm+md². Solves for moment of inertia about any parallel axis.",
        equation: "I = I_cm + md²",
        variables: [
          { id: "I", label: "Moment of Inertia (I)", unit: "kg·m²" },
          { id: "Icm", label: "I at Center of Mass", unit: "kg·m²" },
          { id: "m", label: "Mass", unit: "kg" },
          { id: "d", label: "Distance to Parallel Axis", unit: "m" }
        ],
        calculate: (vals) => {
          const {I,Icm,m,d}=vals;const k=Object.keys(vals).length;if(k<3)return{result:"Need 3 of 4.",steps:""};
          let oI=I,oIcm=Icm,om=m,od=d,s="";
          if(I===undefined){oI=Icm+m*d*d;s:`I = Icm+md² = ${Icm}+${m}×${d}² = ${oI.toFixed(4)}`;}
          else if(Icm===undefined){oIcm=I-m*d*d;s:`Icm = ${oIcm.toFixed(4)}`;}
          else if(m===undefined){om=(I-Icm)/(d*d);s:`m = ${om.toFixed(4)}`;}
          else if(d===undefined){od=Math.sqrt((I-Icm)/m);s:`d = ${od.toFixed(4)}`;}
          return{result:`I = ${oI.toFixed(4)} kg·m² | Icm = ${oIcm.toFixed(4)} | m = ${om.toFixed(4)} kg | d = ${od.toFixed(4)} m`,steps:s};
        }
      },
      {
        id: "rydberg", name: "Rydberg Equation (Hydrogen)",
        description: "1/λ=R(1/n₁²−1/n₂²). Computes wavelength of hydrogen emission lines.",
        equation: "1/λ = R(1/n₁² − 1/n₂²)",
        variables: [
          { id: "n1", label: "Lower Level (n₁)", unit: "" },
          { id: "n2", label: "Upper Level (n₂)", unit: "" }
        ],
        calculate: (vals) => {
          const R=1.097e7;const {n1,n2}=vals;
          if(n1===undefined||n2===undefined)return{result:"Need n₁ and n₂.",steps:""};
          if(n1>=n2)return{result:"Error: n₂ must be greater than n₁.",steps:""};
          const invLambda=R*(1/(n1*n1)-1/(n2*n2));
          const lambda=1/invLambda;
          const freq=3e8/lambda;
          const energy=6.626e-34*freq;
          const eV=energy/1.6e-19;
          let series="";
          if(n1===1)series="Lyman (UV)";
          else if(n1===2)series="Balmer (Visible)";
          else if(n1===3)series="Paschen (IR)";
          else if(n1===4)series="Brackett (IR)";
          else series=`n₁=${n1} series`;
          return{result:`λ = ${lambda.toExponential(4)} m (${(lambda*1e9).toFixed(2)} nm)\nf = ${freq.toExponential(4)} Hz\nE = ${energy.toExponential(4)} J (${eV.toFixed(4)} eV)\nSeries: ${series}`,steps:`1/λ = R(1/${n1}²−1/${n2}²) = ${invLambda.toExponential(4)}`};
        }
      },
      {
        id: "bohr-energy", name: "Bohr Model Energy Levels",
        description: "En=-13.6/n² eV. Computes energy for any hydrogen energy level.",
        equation: "E_n = -13.6/n² eV",
        variables: [
          { id: "n", label: "Energy Level (n)", unit: "" }
        ],
        calculate: (vals) => {
          const {n}=vals;if(n===undefined)return{result:"Enter energy level n.",steps:""};
          if(n<1||!Number.isInteger(n))return{result:"Error: n must be positive integer.",steps:""};
          const En=-13.6/(n*n);
          const ionization=Math.abs(En);
          return{result:`E_${n} = ${En.toFixed(4)} eV\nIonization energy from n=${n}: ${ionization.toFixed(4)} eV\n\nEnergy levels:\nn=1: -13.60 eV | n=2: -3.40 eV\nn=3: -1.51 eV | n=4: -0.85 eV\nn=5: -0.54 eV | n=6: -0.38 eV`,steps:`E_n = -13.6/${n}² = ${En.toFixed(4)} eV`};
        }
      },
      {
        id: "bragg-law", name: "Bragg's Law (X-ray Diffraction)",
        description: "nλ=2d·sinθ. Solves for wavelength, spacing, angle, or order.",
        equation: "nλ = 2d sin(θ)",
        variables: [
          { id: "n", label: "Order (n)", unit: "" },
          { id: "lambda", label: "Wavelength (λ)", unit: "nm" },
          { id: "d", label: "Crystal Spacing (d)", unit: "nm" },
          { id: "theta", label: "Angle (θ)", unit: "°" }
        ],
        calculate: (vals) => {
          const d2r=d=>d*Math.PI/180,r2d=r=>r*180/Math.PI;
          const {n,lambda,d,theta}=vals;const k=Object.keys(vals).length;if(k<3)return{result:"Need 3 of 4.",steps:""};
          let oN=n||1,oLam=lambda,oD=d,oTh=theta,s="";
          if(lambda===undefined){oLam=2*d*Math.sin(d2r(theta))*(n||1);s:`λ = 2d·sinθ·n = ${oLam.toFixed(4)} nm`;}
          else if(d===undefined){oD=(n||1)*lambda/(2*Math.sin(d2r(theta)));s:`d = ${oD.toFixed(4)} nm`;}
          else if(theta===undefined){const sv=(n||1)*lambda/(2*d);if(sv>1)return{result:"Error: sin > 1.",steps:""};oTh=r2d(Math.asin(sv));s:`θ = ${oTh.toFixed(2)}°`;}
          else if(n===undefined){const sv=lambda/(2*d*Math.sin(d2r(theta)));oN=Math.round(sv);s:`n ≈ ${oN}`;}
          return{result:`n=${oN} | λ=${oLam.toFixed(4)} nm | d=${oD.toFixed(4)} nm | θ=${oTh.toFixed(2)}°`,steps:s};
        }
      }
    ]
  },
  {
    category: "Health & Physiology",
    icon: "Calculator",
    formulas: [
      {
        id: "bmr", name: "Basal Metabolic Rate (BMR)",
        description: "Harris-Benedict equation. Estimates daily calorie needs.",
        equation: "Men: 88.36 + 13.4w + 4.8h − 5.7a",
        variables: [
          { id: "gender", label: "0=Male, 1=Female", unit: "" },
          { id: "weight", label: "Weight (kg)", unit: "kg" },
          { id: "height", label: "Height (cm)", unit: "cm" },
          { id: "age", label: "Age (years)", unit: "years" }
        ],
        calculate: (vals) => {
          const {gender,weight,height,age}=vals;
          if(weight===undefined||height===undefined||age===undefined)return{result:"Need weight, height, age.",steps:""};
          const isFemale=Math.round(gender)===1;
          let bmr;
          if(isFemale){bmr=447.6+9.2*weight+3.1*height-4.3*age;}
          else{bmr=88.36+13.4*weight+4.8*height-5.7*age;}
          const sedentary=bmr*1.2;const moderate=bmr*1.55;const active=bmr*1.725;
          return{result:`BMR = ${bmr.toFixed(0)} cal/day (${isFemale?"Female":"Male"})\n\nDaily needs:\nSedentary: ${sedentary.toFixed(0)} cal\nModerate: ${moderate.toFixed(0)} cal\nActive: ${active.toFixed(0)} cal`,steps:`${isFemale?"Female":"Male"}: weight=${weight}kg, height=${height}cm, age=${age}yr`};
        }
      },
      {
        id: "renal-clearance", name: "Renal Clearance Rate",
        description: "C=U×V/P. Computes renal clearance from urine and plasma concentrations.",
        equation: "C = (U × V) / P",
        variables: [
          { id: "C", label: "Clearance Rate", unit: "mL/min" },
          { id: "U", label: "Urine Concentration", unit: "mg/mL" },
          { id: "V", label: "Urine Flow Rate", unit: "mL/min" },
          { id: "P", label: "Plasma Concentration", unit: "mg/mL" }
        ],
        calculate: (vals) => {
          const {C,U,V,P}=vals;const k=Object.keys(vals).length;if(k<3)return{result:"Need 3 of 4.",steps:""};
          let oC=C,oU=U,oV=V,oP=P,s="";
          if(C===undefined){oC=U*V/P;s:`C = U×V/P = ${oC.toFixed(4)} mL/min`;}
          else if(U===undefined){oU=C*P/V;s:`U = ${oU.toFixed(4)}`;}
          else if(V===undefined){oV=C*P/U;s:`V = ${oV.toFixed(4)}`;}
          else if(P===undefined){oP=U*V/C;s:`P = ${oP.toFixed(4)}`;}
          const gfr=125;
          return{result:`Clearance = ${oC.toFixed(4)} mL/min\n${oC>gfr?"Above normal GFR":oC>60?"Normal range":oC>30?"Mildly decreased":"Significantly decreased"}`,steps:s};
        }
      },
      {
        id: "alveolar-gas", name: "Alveolar Gas Equation",
        description: "PAO₂=FiO₂(Patm−PH₂O)−PaCO₂/RQ. Solves for PAO₂, FiO₂, PaCO₂, or RQ.",
        equation: "PAO₂ = FiO₂(Patm−47) − PaCO₂/RQ",
        variables: [
          { id: "PAO2", label: "PAO₂ (mmHg)", unit: "mmHg" },
          { id: "FiO2", label: "FiO₂ (fraction, e.g. 0.21)", unit: "" },
          { id: "PaCO2", label: "PaCO₂ (mmHg)", unit: "mmHg" },
          { id: "RQ", label: "Respiratory Quotient", unit: "" }
        ],
        calculate: (vals) => {
          const {PAO2,FiO2,PaCO2,RQ}=vals;
          const k=Object.keys(vals).length;
          if(k<3)return{result:"Need at least 3 of 4.",steps:"Provide 3 values (Patm=760, PH₂O=47 assumed)."};
          const Patm=760,PH2O=47;
          let oP=PAO2,oF=FiO2,oC=PaCO2,oR=RQ,s="";
          if(PAO2===undefined){
            if(RQ===0)return{result:"Error: RQ cannot be 0 (division by zero).",steps:"RQ must be non-zero."};
            oP=FiO2*(Patm-PH2O)-PaCO2/RQ;
            s=`PAO₂ = ${FiO2}×(${Patm}−${PH2O}) − ${PaCO2}/${RQ} = ${oP.toFixed(2)} mmHg`;
          } else if(FiO2===undefined){
            if(RQ===0)return{result:"Error: RQ cannot be 0.",steps:"RQ must be non-zero."};
            oF=(PAO2+PaCO2/RQ)/(Patm-PH2O);
            s=`FiO₂ = (PAO₂+PaCO₂/RQ)/(Patm−PH₂O) = ${oF.toFixed(4)} (${(oF*100).toFixed(1)}%)`;
          } else if(PaCO2===undefined){
            oC=(FiO2*(Patm-PH2O)-PAO2)*RQ;
            s=`PaCO₂ = (FiO₂×(Patm−PH₂O)−PAO₂)×RQ = ${oC.toFixed(2)} mmHg`;
          } else if(RQ===undefined){
            const denom=FiO2*(Patm-PH2O)-PAO2;
            if(denom===0)return{result:"Error: FiO₂×(Patm−PH₂O)=PAO₂, RQ undefined.",steps:"Check inputs."};
            oR=PaCO2/denom;
            s=`RQ = PaCO₂/(FiO₂×(Patm−PH₂O)−PAO₂) = ${oR.toFixed(4)}`;
          }
          return{result:`PAO₂ = ${oP.toFixed(2)} mmHg\nFiO₂ = ${oF.toFixed(4)} (${(oF*100).toFixed(1)}%)\nPaCO₂ = ${oC.toFixed(2)} mmHg | RQ = ${oR.toFixed(4)}\nPatm = ${Patm} mmHg | PH₂O = ${PH2O} mmHg`,steps:s};
        }
      },
      {
        id: "simpson-diversity", name: "Simpson's Diversity Index",
        description: "D=1−Σ(n(n−1))/(N(N−1)). Computes Simpson's index from species counts.",
        equation: "D = 1 − Σnᵢ(nᵢ−1) / N(N−1)",
        variables: [
          { id: "data", label: "Species counts (comma-sep)", unit: "" }
        ],
        calculate: (vals) => {
          const raw=vals["data"];
          if(!raw)return{result:"Enter species counts.",steps:"e.g. 10, 20, 30"};
          const nums=String(raw).split(",").map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n)&&n>0);
          if(nums.length<2)return{result:"Need at least 2 species.",steps:""};
          const N=nums.reduce((a,b)=>a+b,0);
          let sumNn=0;
          nums.forEach(n=>{sumNn+=n*(n-1);});
          const D=1-sumNn/(N*(N-1));
          const Dinv=1/(1-D);
          return{result:`Simpson's D = ${D.toFixed(4)}\nSimpson's Reciprocal = ${Dinv.toFixed(2)}\nS = ${nums.length} species | N = ${N} total\n${D>0.7?"High diversity":D>0.3?"Moderate diversity":"Low diversity"}`,steps:`D = 1 − ${sumNn}/${N*(N-1)} = ${D.toFixed(4)}`};
        }
      },
      {
        id: "vector-cross", name: "Vector Cross Product (3D)",
        description: "A×B. Computes cross product and resulting magnitude.",
        equation: "A×B = (aybz−azby, azbx−axbz, axby−aybx)",
        variables: [
          { id: "ax", label: "A x", unit: "" },{ id: "ay", label: "A y", unit: "" },{ id: "az", label: "A z", unit: "" },
          { id: "bx", label: "B x", unit: "" },{ id: "by", label: "B y", unit: "" },{ id: "bz", label: "B z", unit: "" }
        ],
        calculate: (vals) => {
          const {ax,ay,az,bx,by,bz}=vals;
          if(ax===undefined||ay===undefined||bx===undefined||by===undefined)return{result:"Need all 6 components.",steps:""};
          const oaz=az||0,obz=bz||0;
          const cx=ay*obz-oaz*by;
          const cy=oaz*bx-ax*obz;
          const cz=ax*by-ay*bx;
          const mag=Math.sqrt(cx*cx+cy*cy+cz*cz);
          const magA=Math.sqrt(ax*ax+ay*ay+oaz*oaz);
          const magB=Math.sqrt(bx*bx+by*by+obz*obz);
          const angle=magA>0&&magB>0?Math.asin(Math.min(1,mag/(magA*magB)))*180/Math.PI:0;
          return{result:`A×B = (${cx.toFixed(4)}, ${cy.toFixed(4)}, ${cz.toFixed(4)})\n|A×B| = ${mag.toFixed(4)}\nAngle between A and B = ${angle.toFixed(2)}°`,steps:`Cross product computed from 3D vectors.`};
        }
      },
      {
        id: "half-angle", name: "Half Angle Formulas",
        description: "sin(θ/2), cos(θ/2), tan(θ/2) from angle θ.",
        equation: "sin(θ/2) = ±√((1−cosθ)/2)",
        variables: [
          { id: "theta", label: "Angle θ", unit: "°" }
        ],
        calculate: (vals) => {
          const {theta}=vals;if(theta===undefined)return{result:"Enter angle θ.",steps:""};
          const r=theta*Math.PI/180;
          const halfR=r/2;
          const sn=Math.sin(halfR),cs=Math.cos(halfR),tn=Math.tan(halfR);
          const sinVerify=Math.sqrt((1-Math.cos(r))/2);
          const cosVerify=Math.sqrt((1+Math.cos(r))/2);
          return{result:`θ/2 = ${(theta/2).toFixed(2)}°\nsin(θ/2) = ${sn.toFixed(6)}\ncos(θ/2) = ${cs.toFixed(6)}\ntan(θ/2) = ${tn===Infinity?"undefined":tn.toFixed(6)}\n\nVerification:\nsin = ±√((1−cos${theta}°)/2) = ${sinVerify.toFixed(6)}\ncos = ±√((1+cos${theta}°)/2) = ${cosVerify.toFixed(6)}`,steps:`Half angle of ${theta}° = ${(theta/2).toFixed(2)}°`};
        }
      },
      {
        id: "angle-between-vectors", name: "Angle Between Two Vectors",
        description: "θ=arccos(A·B/(|A||B|)). Computes angle from vector components.",
        equation: "θ = arccos(A·B / |A||B|)",
        variables: [
          { id: "ax", label: "A x", unit: "" },{ id: "ay", label: "A y", unit: "" },
          { id: "bx", label: "B x", unit: "" },{ id: "by", label: "B y", unit: "" }
        ],
        calculate: (vals) => {
          const {ax,ay,bx,by}=vals;
          if(ax===undefined||ay===undefined||bx===undefined||by===undefined)return{result:"Need all 4 components.",steps:""};
          const dot=ax*bx+ay*by;
          const magA=Math.sqrt(ax*ax+ay*ay);
          const magB=Math.sqrt(bx*bx+by*by);
          if(magA===0||magB===0)return{result:"Error: Zero vector.",steps:""};
          const cosTheta=Math.min(1,Math.max(-1,dot/(magA*magB)));
          const angle=Math.acos(cosTheta)*180/Math.PI;
          const rad=angle*Math.PI/180;
          const projAonB=dot/(magB*magB);
          return{result:`Angle = ${angle.toFixed(4)}° (${rad.toFixed(4)} rad)\nDot product = ${dot.toFixed(4)}\n|A| = ${magA.toFixed(4)} | |B| = ${magB.toFixed(4)}\nProjection of A onto B = ${projAonB.toFixed(4)}\n${angle<90?"Acute":angle===90?"Right angle":angle>90?"Obtuse":""}`,steps:`cosθ = ${dot.toFixed(4)}/(${magA.toFixed(4)}×${magB.toFixed(4)}) = ${cosTheta.toFixed(4)}`};
        }
      }
    ]
  },
  {
    category: "Essential Conversions",
    icon: "Calculator",
    formulas: [
      {
        id: "temp-conversion", name: "Temperature Conversion",
        description: "Converts between Celsius, Fahrenheit, and Kelvin.",
        equation: "°F = °C×9/5+32, K = °C+273.15",
        variables: [
          { id: "C", label: "Celsius (°C)", unit: "°C" },
          { id: "F", label: "Fahrenheit (°F)", unit: "°F" },
          { id: "K", label: "Kelvin (K)", unit: "K" }
        ],
        calculate: (vals) => {
          const {C,F,K}=vals;
          const known=Object.keys(vals).length;
          if(known<1)return{result:"Enter any temperature.",steps:""};
          let oC=C,oF=F,oK=K,s="";
          if(C!==undefined){oF=C*9/5+32;oK=C+273.15;s=`${C}°C = ${oF.toFixed(2)}°F = ${oK.toFixed(2)} K`;}
          else if(F!==undefined){oC=(F-32)*5/9;oK=oC+273.15;s:`${F}°F = ${oC.toFixed(2)}°C = ${oK.toFixed(2)} K`;}
          else if(K!==undefined){oC=K-273.15;oF=oC*9/5+32;s:`${K} K = ${oC.toFixed(2)}°C = ${oF.toFixed(2)}°F`;}
          return{result:`°C = ${oC.toFixed(2)} | °F = ${oF.toFixed(2)} | K = ${oK.toFixed(2)}\n${oC<=0?"At/below freezing ❄️":oC>=100?"At/above boiling 💧":"Normal liquid range 💧"}`,steps:s};
        }
      },
      {
        id: "speed-distance-time", name: "Speed / Distance / Time",
        description: "v=d/t. Solves for speed, distance, or time.",
        equation: "v = d/t",
        variables: [
          { id: "v", label: "Speed", unit: "m/s" },
          { id: "d", label: "Distance", unit: "m" },
          { id: "t", label: "Time", unit: "s" }
        ],
        calculate: (vals) => {
          const {v,d,t}=vals;const k=Object.keys(vals).length;if(k<2)return{result:"Need 2 of 3.",steps:""};
          let oV=v,oD=d,oT=t,s="";
          if(v===undefined){oV=d/t;s:`v = d/t = ${d}/${t} = ${oV.toFixed(4)} m/s`;}
          else if(d===undefined){oD=v*t;s:`d = vt = ${oD.toFixed(4)} m`;}
          else if(t===undefined){oT=d/v;s:`t = d/v = ${oT.toFixed(4)} s`;}
          const kmh=oV*3.6;
          return{result:`v = ${oV.toFixed(4)} m/s (${kmh.toFixed(2)} km/h)\nd = ${oD.toFixed(4)} m | t = ${oT.toFixed(4)} s`,steps:s};
        }
      },
      {
        id: "photon-energy", name: "Photon Energy",
        description: "E=hf=hc/λ. Solves for photon energy, frequency, or wavelength.",
        equation: "E = hf = hc/λ",
        variables: [
          { id: "E", label: "Energy", unit: "eV" },
          { id: "f", label: "Frequency", unit: "Hz" },
          { id: "lambda", label: "Wavelength", unit: "nm" }
        ],
        calculate: (vals) => {
          const h=6.626e-34,c=3e8,eV=1.6e-19;
          const {E,f,lambda}=vals;const k=Object.keys(vals).length;if(k<2)return{result:"Need 2 of 3.",steps:""};
          let oE=E,oF=f,oLam=lambda,s="";
          if(E===undefined&&f!==undefined){oE=h*f/eV;s:`E = hf = ${oE.toFixed(4)} eV`;}
          else if(E===undefined&&lambda!==undefined){const lamM=lambda*1e-9;oE=h*c/lamM/eV;s:`E = hc/λ = ${oE.toFixed(4)} eV`;}
          else if(f===undefined){oF=E*eV/h;s:`f = ${oF.toExponential(4)} Hz`;}
          else if(lambda===undefined){oLam=h*c/(f*1e-9);oLam=h*c/(E*eV)*1e9;s:`λ = ${oLam.toFixed(2)} nm`;}
          const lamM=oLam?oLam*1e-9:h*c/(oF||0);
          const region=oLam<400?"Ultraviolet":oLam<700?"Visible light":oLam<1e6?"Infrared":"Radio/microwave";
          return{result:`E = ${oE.toFixed(4)} eV\nf = ${(oF||0).toExponential(4)} Hz\nλ = ${(oLam||0).toFixed(2)} nm\nRegion: ${region}`,steps:s};
        }
      },
      {
        id: "mass-defect", name: "Mass Defect & Binding Energy",
        description: "Δm=Zmp+Nmn−M. Computes mass defect and nuclear binding energy.",
        equation: "Δm = Zmp + Nmn − M",
        variables: [
          { id: "Z", label: "Protons (Z)", unit: "" },
          { id: "N", label: "Neutrons (N)", unit: "" },
          { id: "M", label: "Actual Mass (u)", unit: "u" }
        ],
        calculate: (vals) => {
          const mp=1.00728,mn=1.00867,c2=931.5;
          const {Z,N,M}=vals;
          if(Z===undefined||N===undefined||M===undefined)return{result:"Need Z, N, and M.",steps:""};
          const expected=Z*mp+N*mn;
          const dm=expected-M;
          const BE=dm*c2;
          const A=Z+N;
          const BEperN=BE/A;
          return{result:`Mass defect Δm = ${dm.toFixed(6)} u\nBinding energy = ${BE.toFixed(4)} MeV\nBE per nucleon = ${BEperN.toFixed(4)} MeV\n\nExpected mass = ${expected.toFixed(6)} u\nActual mass = ${M.toFixed(6)} u`,steps:`Δm = ${Z}×${mp} + ${N}×${mn} − ${M} = ${dm.toFixed(6)} u\nBE = Δm×c² = ${dm.toFixed(6)}×931.5 = ${BE.toFixed(4)} MeV`};
        }
      }
    ]
  }

  ,{
    category: "Computer Science & Information Theory",
    formulas: [
      {
        id: "shannon-capacity", name: "Shannon-Hartley Capacity",
        description: "Maximum data rate of a noisy channel given bandwidth and signal-to-noise ratio.",
        equation: "C = B × log₂(1 + S/N)",
        variables: [
          { id: "C", label: "Channel Capacity (C)", unit: "bps" },
          { id: "B", label: "Bandwidth (B)", unit: "Hz" },
          { id: "S", label: "Signal Power (S)", unit: "W" },
          { id: "N", label: "Noise Power (N)", unit: "W" }
        ],
        calculate: ({ C, B, S, N }) => {
          if (S !== undefined && N !== undefined && N !== 0) {
            const snr = S / N;
            if (snr <= -1) return { result: "Error: S/N cannot be ≤ -1", steps: "" };
          }
          if (C === undefined && B !== undefined && S !== undefined && N !== undefined) {
            if (N === 0) return { result: "Error: Noise cannot be 0", steps: "" };
            const c = B * Math.log2(1 + S / N);
            return { result: `C = ${c.toFixed(2)} bps`, steps: `C = ${B} × log₂(1 + ${S}/${N}) = ${c.toFixed(2)}` };
          }
          if (B === undefined && C !== undefined && S !== undefined && N !== undefined) {
            if (N === 0) return { result: "Error: Noise cannot be 0", steps: "" };
            const snr = S / N;
            if (snr === 0) return { result: "Error: SNR is 0, cannot divide by 0", steps: "" };
            const b = C / Math.log2(1 + snr);
            return { result: `B = ${b.toFixed(2)} Hz`, steps: `B = ${C} / log₂(1 + ${S}/${N}) = ${b.toFixed(2)}` };
          }
          if (S === undefined && C !== undefined && B !== undefined && N !== undefined) {
            if (B === 0) return { result: "Error: Bandwidth cannot be 0", steps: "" };
            const snr = Math.pow(2, C / B) - 1;
            const s = snr * N;
            return { result: `S = ${s.toFixed(4)} W`, steps: `S/N = 2^(${C}/${B}) - 1 \nS = ${snr.toFixed(4)} × ${N} = ${s.toFixed(4)}` };
          }
          if (N === undefined && C !== undefined && B !== undefined && S !== undefined) {
            if (B === 0) return { result: "Error: Bandwidth cannot be 0", steps: "" };
            const snr = Math.pow(2, C / B) - 1;
            if (snr === 0) return { result: "Error: Required SNR is 0", steps: "" };
            const n = S / snr;
            return { result: `N = ${n.toFixed(4)} W`, steps: `S/N = 2^(${C}/${B}) - 1 \nN = ${S} / ${snr.toFixed(4)} = ${n.toFixed(4)}` };
          }
        }
      },
      {
        id: "amdahls-law", name: "Amdahl's Law (Speedup)",
        description: "Maximum theoretical speedup of a program using parallel processors, limited by serial fraction.",
        equation: "S = 1 / ((1-p) + p/N)",
        variables: [
          { id: "S", label: "Speedup (S)", unit: "" },
          { id: "p", label: "Parallel Proportion (p)", unit: "" },
          { id: "N", label: "Number of Processors (N)", unit: "" }
        ],
        calculate: ({ S, p, N }) => {
          if (S === undefined && p !== undefined && N !== undefined) {
            if (p === 1 && N === 0) return { result: "Error: Infinite speedup", steps: "" };
            const s = 1 / ((1 - p) + p / N);
            return { result: `S = ${s.toFixed(4)}`, steps: `S = 1 / ((1 - ${p}) + ${p}/${N}) = ${s.toFixed(4)}` };
          }
          if (p === undefined && S !== undefined && N !== undefined) {
            const pVal = (1 - 1 / S) / (1 - 1 / N);
            return { result: `p = ${pVal.toFixed(4)}`, steps: `p = (1 - 1/${S}) / (1 - 1/${N}) = ${pVal.toFixed(4)}` };
          }
          if (N === undefined && S !== undefined && p !== undefined) {
            if (p === 0) return { result: "Error: p=0 means no parallel part", steps: "" };
            const denom = (1 / S) - (1 - p);
            if (denom <= 0) return { result: "Error: Speedup too high for given p", steps: "" };
            const n = p / denom;
            return { result: `N = ${Math.ceil(n)} (approx ${n.toFixed(2)})`, steps: `N = ${p} / ((1/${S}) - (1-${p}))` };
          }
        }
      },
      {
        id: "gustafson", name: "Gustafson's Law",
        description: "Scaled speedup for parallel computing that accounts for scaling the problem size with processors.",
        equation: "S = s + p × N",
        variables: [
          { id: "S", label: "Scaled Speedup (S)", unit: "" },
          { id: "s", label: "Serial Proportion (s)", unit: "" },
          { id: "N", label: "Processors (N)", unit: "" }
        ],
        calculate: ({ S, s, N }) => {
          if (S === undefined && s !== undefined && N !== undefined) {
            const p = 1 - s;
            const res = s + p * N;
            return { result: `S = ${res.toFixed(4)}`, steps: `S = ${s} + (1 - ${s})×${N} = ${res.toFixed(4)}` };
          }
          if (s === undefined && S !== undefined && N !== undefined) {
            if (N === 1) return { result: "Error: N=1 provides no scaling", steps: "" };
            const ser = (N - S) / (N - 1);
            return { result: `s = ${ser.toFixed(4)}`, steps: `s = (${N} - ${S}) / (${N} - 1) = ${ser.toFixed(4)}` };
          }
          if (N === undefined && S !== undefined && s !== undefined) {
            const p = 1 - s;
            if (p === 0) return { result: "Error: p=0", steps: "" };
            const n = (S - s) / p;
            return { result: `N = ${Math.ceil(n)} (approx ${n.toFixed(2)})`, steps: `N = (${S} - ${s}) / ${p}` };
          }
        }
      },
      {
        id: "littles-law", name: "Little's Law",
        description: "Fundamental queueing theorem relating average items in a system to arrival rate and wait time.",
        equation: "L = λ × W",
        variables: [
          { id: "L", label: "Items in System (L)", unit: "" },
          { id: "lambda", label: "Arrival Rate (λ)", unit: "1/s" },
          { id: "W", label: "Wait Time (W)", unit: "s" }
        ],
        calculate: ({ L, lambda, W }) => {
          if (L === undefined && lambda !== undefined && W !== undefined) return { result: `L = ${(lambda*W).toFixed(2)}`, steps: `L = ${lambda} × ${W}` };
          if (lambda === undefined && L !== undefined && W !== undefined) return W===0 ? {result:"Error: W=0", steps:""} : { result: `λ = ${(L/W).toFixed(4)} items/s`, steps: `λ = ${L} / ${W}` };
          if (W === undefined && L !== undefined && lambda !== undefined) return lambda===0 ? {result:"Error: λ=0", steps:""} : { result: `W = ${(L/lambda).toFixed(4)} s`, steps: `W = ${L} / ${lambda}` };
        }
      },
      {
        id: "network-transfer", name: "Network Transfer Time",
        description: "Calculate file transfer time based on file size and available bandwidth.",
        equation: "T = S / B",
        variables: [
          { id: "T", label: "Time (T)", unit: "s" },
          { id: "S", label: "Size (S)", unit: "MB" },
          { id: "B", label: "Bandwidth (B)", unit: "MB/s" }
        ],
        calculate: ({ T, S, B }) => {
          if (T === undefined && S !== undefined && B !== undefined) return B===0 ? {result:"Error: B=0", steps:""} : { result: `T = ${(S/B).toFixed(2)} s`, steps: `T = ${S} / ${B}` };
          if (S === undefined && T !== undefined && B !== undefined) return { result: `S = ${(T*B).toFixed(2)} MB`, steps: `S = ${T} × ${B}` };
          if (B === undefined && T !== undefined && S !== undefined) return T===0 ? {result:"Error: T=0", steps:""} : { result: `B = ${(S/T).toFixed(2)} MB/s`, steps: `B = ${S} / ${T}` };
        }
      }
    ]
  },
  {
    category: "Advanced Finance & Economics",
    formulas: [
      {
        id: "pv-annuity", name: "Present Value of Annuity",
        description: "Present value of a series of equal periodic payments discounted at a fixed rate.",
        equation: "PV = P × (1 - (1+r)^-n) / r",
        variables: [
          { id: "PV", label: "Present Value (PV)", unit: "$" },
          { id: "P", label: "Payment per Period (P)", unit: "$" },
          { id: "r", label: "Rate per Period (r)", unit: "%" },
          { id: "n", label: "Number of Periods (n)", unit: "" }
        ],
        calculate: ({ PV, P, r, n }) => {
          const R = r !== undefined ? r / 100 : undefined;
          if (PV === undefined && P !== undefined && R !== undefined && n !== undefined) {
            if (R === 0) return { result: `PV = $${(P * n).toFixed(2)}`, steps: `r = 0, PV = ${P} × ${n}` };
            const pv = P * (1 - Math.pow(1 + R, -n)) / R;
            return { result: `PV = $${pv.toFixed(2)}`, steps: `PV = ${P} × (1 - (1+${R})^-${n}) / ${R}` };
          }
          if (P === undefined && PV !== undefined && R !== undefined && n !== undefined) {
            if (R === 0) return n === 0 ? { result:"Error: n=0", steps:"" } : { result: `P = $${(PV / n).toFixed(2)}`, steps: `P = ${PV} / ${n}` };
            const p = PV * R / (1 - Math.pow(1 + R, -n));
            return { result: `P = $${p.toFixed(2)}`, steps: `P = ${PV} × ${R} / (1 - (1+${R})^-${n})` };
          }
          if (n === undefined && PV !== undefined && P !== undefined && R !== undefined) {
            if (R === 0) return P === 0 ? { result:"Error: P=0", steps:"" } : { result: `n = ${(PV / P).toFixed(2)}`, steps: `n = ${PV} / ${P}` };
            const arg = 1 - (PV * R / P);
            if (arg <= 0) return { result: "Error: Payment too small to pay off PV", steps: "" };
            const num = -Math.log(arg) / Math.log(1 + R);
            return { result: `n = ${num.toFixed(2)} periods`, steps: `n = -ln(1 - ${PV}×${R}/${P}) / ln(1+${R})` };
          }
        }
      },
      {
        id: "fv-annuity", name: "Future Value of Annuity",
        description: "Future value of a series of equal periodic payments compounded at a fixed rate.",
        equation: "FV = P × ((1+r)^n - 1) / r",
        variables: [
          { id: "FV", label: "Future Value (FV)", unit: "$" },
          { id: "P", label: "Payment per Period (P)", unit: "$" },
          { id: "r", label: "Rate per Period (r)", unit: "%" },
          { id: "n", label: "Number of Periods (n)", unit: "" }
        ],
        calculate: ({ FV, P, r, n }) => {
          const R = r !== undefined ? r / 100 : undefined;
          if (FV === undefined && P !== undefined && R !== undefined && n !== undefined) {
            if (R === 0) return { result: `FV = $${(P * n).toFixed(2)}`, steps: `r = 0, FV = ${P} × ${n}` };
            const fv = P * (Math.pow(1 + R, n) - 1) / R;
            return { result: `FV = $${fv.toFixed(2)}`, steps: `FV = ${P} × ((1+${R})^${n} - 1) / ${R}` };
          }
          if (P === undefined && FV !== undefined && R !== undefined && n !== undefined) {
            if (R === 0) return n === 0 ? { result:"Error: n=0", steps:"" } : { result: `P = $${(FV / n).toFixed(2)}`, steps: `P = ${FV} / ${n}` };
            const p = FV * R / (Math.pow(1 + R, n) - 1);
            return { result: `P = $${p.toFixed(2)}`, steps: `P = ${FV} × ${R} / ((1+${R})^${n} - 1)` };
          }
          if (n === undefined && FV !== undefined && P !== undefined && R !== undefined) {
            if (R === 0) return P === 0 ? { result:"Error: P=0", steps:"" } : { result: `n = ${(FV / P).toFixed(2)}`, steps: `n = ${FV} / ${P}` };
            const arg = 1 + (FV * R / P);
            const num = Math.log(arg) / Math.log(1 + R);
            return { result: `n = ${num.toFixed(2)} periods`, steps: `n = ln(1 + ${FV}×${R}/${P}) / ln(1+${R})` };
          }
        }
      },
      {
        id: "mortgage-amort", name: "Mortgage Amortization",
        description: "Monthly payment on a fixed-rate mortgage loan with principal, interest, and term.",
        equation: "M = P × r(1+r)^n / ((1+r)^n - 1)",
        variables: [
          { id: "M", label: "Monthly Payment (M)", unit: "$" },
          { id: "P", label: "Principal (P)", unit: "$" },
          { id: "r", label: "Annual Rate (r)", unit: "%" },
          { id: "n", label: "Total Months (n)", unit: "" }
        ],
        calculate: ({ M, P, r, n }) => {
          const R = r !== undefined ? (r / 100) / 12 : undefined; // monthly rate
          if (M === undefined && P !== undefined && R !== undefined && n !== undefined) {
            if (R === 0) return { result: `M = $${(P / n).toFixed(2)}`, steps: `r = 0, M = ${P} / ${n}` };
            const m = P * (R * Math.pow(1 + R, n)) / (Math.pow(1 + R, n) - 1);
            return { result: `M = $${m.toFixed(2)}`, steps: `M = ${P} × (${R}(1+${R})^${n}) / ((1+${R})^${n} - 1)` };
          }
          if (P === undefined && M !== undefined && R !== undefined && n !== undefined) {
            if (R === 0) return { result: `P = $${(M * n).toFixed(2)}`, steps: `r = 0, P = ${M} × ${n}` };
            const p = M * (Math.pow(1 + R, n) - 1) / (R * Math.pow(1 + R, n));
            return { result: `P = $${p.toFixed(2)}`, steps: `P = ${M} × ((1+${R})^${n} - 1) / (${R}(1+${R})^${n})` };
          }
          if (n === undefined && M !== undefined && P !== undefined && R !== undefined) {
            if (R === 0) return M === 0 ? { result:"Error: M=0", steps:"" } : { result: `n = ${(P / M).toFixed(2)}`, steps: `n = ${P} / ${M}` };
            const arg = M / (M - P * R);
            if (arg <= 0) return { result: "Error: Payment too small for interest", steps: "" };
            const num = Math.log(arg) / Math.log(1 + R);
            return { result: `n = ${num.toFixed(2)} months`, steps: `n = ln(${M} / (${M} - ${P}×${R})) / ln(1+${R})` };
          }
        }
      },
      {
        id: "capm", name: "Capital Asset Pricing Model",
        description: "Expected return on an asset based on its systematic risk relative to the market.",
        equation: "E(R) = Rf + β(E(Rm) - Rf)",
        variables: [
          { id: "ER", label: "Expected Return", unit: "%" },
          { id: "Rf", label: "Risk-Free Rate", unit: "%" },
          { id: "Beta", label: "Beta (β)", unit: "" },
          { id: "ERm", label: "Market Return", unit: "%" }
        ],
        calculate: ({ ER, Rf, Beta, ERm }) => {
          if (ER === undefined && Rf !== undefined && Beta !== undefined && ERm !== undefined) {
            const er = Rf + Beta * (ERm - Rf);
            return { result: `ER = ${er.toFixed(2)}%`, steps: `ER = ${Rf} + ${Beta}(${ERm} - ${Rf})` };
          }
          if (Beta === undefined && ER !== undefined && Rf !== undefined && ERm !== undefined) {
            if (ERm === Rf) return { result: "Error: Market return = Risk-free rate (div by 0)", steps: "" };
            const b = (ER - Rf) / (ERm - Rf);
            return { result: `β = ${b.toFixed(4)}`, steps: `β = (${ER} - ${Rf}) / (${ERm} - ${Rf})` };
          }
          if (ERm === undefined && ER !== undefined && Rf !== undefined && Beta !== undefined) {
            if (Beta === 0) return { result: "Error: Beta is 0", steps: "" };
            const erm = (ER - Rf) / Beta + Rf;
            return { result: `ERm = ${erm.toFixed(2)}%`, steps: `ERm = (${ER} - ${Rf}) / ${Beta} + ${Rf}` };
          }
        }
      },
      {
        id: "elasticity", name: "Price Elasticity of Demand",
        description: "Midpoint formula for price elasticity of demand measuring quantity sensitivity to price changes.",
        equation: "E = (%ΔQ) / (%ΔP)",
        variables: [
          { id: "E", label: "Elasticity (E)", unit: "" },
          { id: "Q1", label: "Old Quantity", unit: "" },
          { id: "Q2", label: "New Quantity", unit: "" },
          { id: "P1", label: "Old Price", unit: "$" },
          { id: "P2", label: "New Price", unit: "$" }
        ],
        calculate: ({ E, Q1, Q2, P1, P2 }) => {
          if (E === undefined && Q1 !== undefined && Q2 !== undefined && P1 !== undefined && P2 !== undefined) {
            const midQ = (Q1 + Q2) / 2;
            const midP = (P1 + P2) / 2;
            if (midQ === 0 || midP === 0) return { result: "Error: Midpoints cannot be 0", steps: "" };
            const dQ = (Q2 - Q1) / midQ;
            const dP = (P2 - P1) / midP;
            if (dP === 0) return { result: "Error: No price change", steps: "" };
            const e = dQ / dP;
            return { result: `E = ${e.toFixed(4)}`, steps: `%ΔQ = ${dQ.toFixed(4)}, %ΔP = ${dP.toFixed(4)}` };
          }
        }
      },
      {
        id: "roi", name: "Return on Investment (ROI)",
        description: "Return on investment as a percentage of the original cost.",
        equation: "ROI = (Gain - Cost) / Cost × 100",
        variables: [
          { id: "ROI", label: "ROI", unit: "%" },
          { id: "G", label: "Gain/Return", unit: "$" },
          { id: "C", label: "Cost", unit: "$" }
        ],
        calculate: ({ ROI, G, C }) => {
          if (ROI === undefined && G !== undefined && C !== undefined) {
            if (C === 0) return { result: "Error: Cost is 0", steps: "" };
            const r = ((G - C) / C) * 100;
            return { result: `ROI = ${r.toFixed(2)}%`, steps: `ROI = (${G} - ${C}) / ${C} × 100` };
          }
          if (G === undefined && ROI !== undefined && C !== undefined) {
            const g = C * (ROI / 100) + C;
            return { result: `Gain = $${g.toFixed(2)}`, steps: `Gain = ${C} × (${ROI}/100) + ${C}` };
          }
          if (C === undefined && ROI !== undefined && G !== undefined) {
            const denom = (ROI / 100) + 1;
            if (denom === 0) return { result: "Error: ROI is -100%", steps: "" };
            const c = G / denom;
            return { result: `Cost = $${c.toFixed(2)}`, steps: `Cost = ${G} / (${ROI}/100 + 1)` };
          }
        }
      },
      {
        id: "wacc", name: "Weighted Average Cost of Capital",
        description: "Weighted average cost of capital combining equity and after-tax debt costs.",
        equation: "WACC = (E/V)Re + (D/V)Rd(1-Tc)",
        variables: [
          { id: "WACC", label: "WACC", unit: "%" },
          { id: "E", label: "Market Value Equity", unit: "$" },
          { id: "D", label: "Market Value Debt", unit: "$" },
          { id: "Re", label: "Cost of Equity", unit: "%" },
          { id: "Rd", label: "Cost of Debt", unit: "%" },
          { id: "Tc", label: "Corp Tax Rate", unit: "%" }
        ],
        calculate: ({ WACC, E, D, Re, Rd, Tc }) => {
          if (WACC === undefined && E !== undefined && D !== undefined && Re !== undefined && Rd !== undefined && Tc !== undefined) {
            const V = E + D;
            if (V === 0) return { result: "Error: Total value V=0", steps: "" };
            const wacc = (E / V) * Re + (D / V) * Rd * (1 - Tc / 100);
            return { result: `WACC = ${wacc.toFixed(4)}%`, steps: `(${E}/${V})×${Re} + (${D}/${V})×${Rd}×(1-${Tc}/100)` };
          }
        }
      },
      {
        id: "bep", name: "Break-Even Point (Units)",
        description: "Number of units needed to sell to cover fixed costs at a given price and variable cost.",
        equation: "Q = FC / (P - VC)",
        variables: [
          { id: "Q", label: "Units to Break Even", unit: "" },
          { id: "FC", label: "Fixed Costs", unit: "$" },
          { id: "P", label: "Price per Unit", unit: "$" },
          { id: "VC", label: "Variable Cost per Unit", unit: "$" }
        ],
        calculate: ({ Q, FC, P, VC }) => {
          if (Q === undefined && FC !== undefined && P !== undefined && VC !== undefined) {
            if (P === VC) return { result: "Error: Price = Variable Cost (0 denom)", steps: "" };
            const q = FC / (P - VC);
            return { result: `Q = ${q.toFixed(2)} units`, steps: `Q = ${FC} / (${P} - ${VC})` };
          }
          if (P === undefined && Q !== undefined && FC !== undefined && VC !== undefined) {
            if (Q === 0) return { result: "Error: Q=0", steps: "" };
            const p = FC / Q + VC;
            return { result: `P = $${p.toFixed(2)}`, steps: `P = ${FC} / ${Q} + ${VC}` };
          }
        }
      }
    ]
  },
  {
    category: "Aerospace & Advanced Fluid Dynamics",
    formulas: [
      {
        id: "mach", name: "Mach Number",
        description: "Ratio of an object's speed to the local speed of sound in the medium.",
        equation: "M = v / c",
        variables: [
          { id: "M", label: "Mach Number (M)", unit: "" },
          { id: "v", label: "Velocity (v)", unit: "m/s" },
          { id: "c", label: "Speed of Sound (c)", unit: "m/s" }
        ],
        calculate: ({ M, v, c }) => {
          if (M === undefined && v !== undefined && c !== undefined) return c===0 ? {result:"Error: c=0", steps:""} : { result: `M = ${(v/c).toFixed(3)}`, steps: `${v} / ${c}` };
          if (v === undefined && M !== undefined && c !== undefined) return { result: `v = ${(M*c).toFixed(2)} m/s`, steps: `${M} × ${c}` };
          if (c === undefined && M !== undefined && v !== undefined) return M===0 ? {result:"Error: M=0", steps:""} : { result: `c = ${(v/M).toFixed(2)} m/s`, steps: `${v} / ${M}` };
        }
      },
      {
        id: "dyn-pressure", name: "Dynamic Pressure",
        description: "Kinetic energy per unit volume of a flowing fluid, used in aerodynamics.",
        equation: "q = ½ρv²",
        variables: [
          { id: "q", label: "Dynamic Pressure (q)", unit: "Pa" },
          { id: "rho", label: "Density (ρ)", unit: "kg/m³" },
          { id: "v", label: "Velocity (v)", unit: "m/s" }
        ],
        calculate: ({ q, rho, v }) => {
          if (q === undefined && rho !== undefined && v !== undefined) {
            return { result: `q = ${(0.5 * rho * v * v).toFixed(2)} Pa`, steps: `0.5 × ${rho} × ${v}²` };
          }
          if (v === undefined && q !== undefined && rho !== undefined) {
            if (rho === 0) return { result: "Error: ρ=0", steps: "" };
            if (q / rho < 0) return { result: "Error: Negative root", steps: "" };
            return { result: `v = ${Math.sqrt(2 * q / rho).toFixed(2)} m/s`, steps: `√(2 × ${q} / ${rho})` };
          }
        }
      },
      {
        id: "lift-eq", name: "Lift Equation",
        description: "Aerodynamic lift force on a wing from air density, velocity, wing area, and lift coefficient.",
        equation: "L = ½ρv²SC_L",
        variables: [
          { id: "L", label: "Lift Force (L)", unit: "N" },
          { id: "rho", label: "Density (ρ)", unit: "kg/m³" },
          { id: "v", label: "Velocity (v)", unit: "m/s" },
          { id: "S", label: "Wing Area (S)", unit: "m²" },
          { id: "CL", label: "Lift Coefficient (C_L)", unit: "" }
        ],
        calculate: ({ L, rho, v, S, CL }) => {
          if (L === undefined && rho !== undefined && v !== undefined && S !== undefined && CL !== undefined) {
            const l = 0.5 * rho * v * v * S * CL;
            return { result: `L = ${l.toFixed(2)} N`, steps: `0.5 × ${rho} × ${v}² × ${S} × ${CL}` };
          }
          if (CL === undefined && L !== undefined && rho !== undefined && v !== undefined && S !== undefined) {
            const denom = 0.5 * rho * v * v * S;
            if (denom === 0) return { result: "Error: 0 denominator", steps: "" };
            return { result: `C_L = ${(L / denom).toFixed(4)}`, steps: `${L} / (0.5 × ${rho} × ${v}² × ${S})` };
          }
        }
      },
      {
        id: "froude", name: "Froude Number",
        description: "Dimensionless number comparing flow inertia to gravitational effects in fluid mechanics.",
        equation: "Fr = v / √(gL)",
        variables: [
          { id: "Fr", label: "Froude Number (Fr)", unit: "" },
          { id: "v", label: "Velocity (v)", unit: "m/s" },
          { id: "g", label: "Gravity (g)", unit: "m/s²" },
          { id: "L", label: "Characteristic Length (L)", unit: "m" }
        ],
        calculate: ({ Fr, v, g, L }) => {
          if (Fr === undefined && v !== undefined && g !== undefined && L !== undefined) {
            if (g * L <= 0) return { result: "Error: g*L <= 0", steps: "" };
            return { result: `Fr = ${(v / Math.sqrt(g * L)).toFixed(4)}`, steps: `${v} / √(${g} × ${L})` };
          }
          if (v === undefined && Fr !== undefined && g !== undefined && L !== undefined) {
            if (g * L < 0) return { result: "Error: g*L < 0", steps: "" };
            return { result: `v = ${(Fr * Math.sqrt(g * L)).toFixed(4)} m/s`, steps: `${Fr} × √(${g} × ${L})` };
          }
        }
      },
      {
        id: "capillary-rise", name: "Capillary Rise",
        description: "Height liquid rises in a narrow tube due to surface tension and contact angle.",
        equation: "h = 2γcosθ / (ρgr)",
        variables: [
          { id: "h", label: "Height (h)", unit: "m" },
          { id: "gamma", label: "Surface Tension (γ)", unit: "N/m" },
          { id: "theta", label: "Contact Angle (θ)", unit: "°" },
          { id: "rho", label: "Density (ρ)", unit: "kg/m³" },
          { id: "r", label: "Radius (r)", unit: "m" }
        ],
        calculate: ({ h, gamma, theta, rho, r }) => {
          const g = 9.80665;
          if (h === undefined && gamma !== undefined && theta !== undefined && rho !== undefined && r !== undefined) {
            if (rho * r === 0) return { result: "Error: 0 denominator", steps: "" };
            const rad = theta * Math.PI / 180;
            const res = (2 * gamma * Math.cos(rad)) / (rho * g * r);
            return { result: `h = ${res.toExponential(4)} m`, steps: `(2 × ${gamma} × cos(${theta}°)) / (${rho} × 9.81 × ${r})` };
          }
        }
      },
      {
        id: "specific-impulse", name: "Specific Impulse",
        description: "Efficiency of a rocket engine measured as thrust per unit weight flow of propellant.",
        equation: "Isp = ve / g₀",
        variables: [
          { id: "Isp", label: "Specific Impulse (Isp)", unit: "s" },
          { id: "ve", label: "Exhaust Velocity (ve)", unit: "m/s" },
          { id: "g", label: "Gravity (g₀)", unit: "m/s²" }
        ],
        calculate: ({ Isp, ve, g }) => {
          if (Isp === undefined && ve !== undefined && g !== undefined) return g===0 ? {result:"Error: g=0", steps:""} : { result: `Isp = ${(ve/g).toFixed(2)} s`, steps: `${ve} / ${g}` };
          if (ve === undefined && Isp !== undefined && g !== undefined) return { result: `ve = ${(Isp*g).toFixed(2)} m/s`, steps: `${Isp} × ${g}` };
        }
      }
    ]
  },
  {
    category: "Civil & Structural Engineering",
    formulas: [
      {
        id: "stress", name: "Stress (Normal)",
        description: "Normal stress is the internal force per unit area on a cross-section of a material.",
        equation: "σ = F / A",
        variables: [
          { id: "sigma", label: "Stress (σ)", unit: "Pa" },
          { id: "F", label: "Force (F)", unit: "N" },
          { id: "A", label: "Area (A)", unit: "m²" }
        ],
        calculate: ({ sigma, F, A }) => {
          if (sigma === undefined && F !== undefined && A !== undefined) return A===0 ? {result:"Error: A=0", steps:""} : { result: `σ = ${(F/A).toExponential(4)} Pa`, steps: `${F} / ${A}` };
          if (F === undefined && sigma !== undefined && A !== undefined) return { result: `F = ${(sigma*A).toFixed(2)} N`, steps: `${sigma} × ${A}` };
          if (A === undefined && sigma !== undefined && F !== undefined) return sigma===0 ? {result:"Error: σ=0", steps:""} : { result: `A = ${(F/sigma).toExponential(4)} m²`, steps: `${F} / ${sigma}` };
        }
      },
      {
        id: "strain", name: "Strain",
        description: "Deformation of a material expressed as change in length divided by original length.",
        equation: "ε = ΔL / L₀",
        variables: [
          { id: "epsilon", label: "Strain (ε)", unit: "" },
          { id: "dL", label: "Change in Length (ΔL)", unit: "m" },
          { id: "L0", label: "Original Length (L₀)", unit: "m" }
        ],
        calculate: ({ epsilon, dL, L0 }) => {
          if (epsilon === undefined && dL !== undefined && L0 !== undefined) return L0===0 ? {result:"Error: L₀=0", steps:""} : { result: `ε = ${(dL/L0).toExponential(4)}`, steps: `${dL} / ${L0}` };
          if (dL === undefined && epsilon !== undefined && L0 !== undefined) return { result: `ΔL = ${(epsilon*L0).toExponential(4)} m`, steps: `${epsilon} × ${L0}` };
          if (L0 === undefined && epsilon !== undefined && dL !== undefined) return epsilon===0 ? {result:"Error: ε=0", steps:""} : { result: `L₀ = ${(dL/epsilon).toExponential(4)} m`, steps: `${dL} / ${epsilon}` };
        }
      },
      {
        id: "euler-buckling", name: "Euler's Buckling Load",
        description: "Critical axial load at which a slender column buckles under compression.",
        equation: "Pcr = π²EI / (KL)²",
        variables: [
          { id: "Pcr", label: "Critical Load (Pcr)", unit: "N" },
          { id: "E", label: "Young's Modulus (E)", unit: "Pa" },
          { id: "I", label: "Area Moment (I)", unit: "m⁴" },
          { id: "K", label: "Column Eff Length Factor (K)", unit: "" },
          { id: "L", label: "Column Length (L)", unit: "m" }
        ],
        calculate: ({ Pcr, E, I, K, L }) => {
          if (Pcr === undefined && E !== undefined && I !== undefined && K !== undefined && L !== undefined) {
            if (K * L === 0) return { result: "Error: K×L = 0", steps: "" };
            const p = (Math.PI * Math.PI * E * I) / Math.pow(K * L, 2);
            return { result: `Pcr = ${p.toExponential(4)} N`, steps: `π² × ${E} × ${I} / (${K} × ${L})²` };
          }
        }
      },
      {
        id: "soil-porosity", name: "Soil Porosity",
        description: "Fraction of total soil volume occupied by voids (air and water).",
        equation: "n = Vv / Vt",
        variables: [
          { id: "n", label: "Porosity (n)", unit: "" },
          { id: "Vv", label: "Volume of Voids (Vv)", unit: "m³" },
          { id: "Vt", label: "Total Volume (Vt)", unit: "m³" }
        ],
        calculate: ({ n, Vv, Vt }) => {
          if (n === undefined && Vv !== undefined && Vt !== undefined) return Vt===0 ? {result:"Error: Vt=0", steps:""} : { result: `n = ${(Vv/Vt).toFixed(4)}`, steps: `${Vv} / ${Vt}` };
          if (Vv === undefined && n !== undefined && Vt !== undefined) return { result: `Vv = ${(n*Vt).toFixed(4)} m³`, steps: `${n} × ${Vt}` };
        }
      },
      {
        id: "soil-void-ratio", name: "Soil Void Ratio",
        description: "Ratio of void volume to solid volume in a soil sample.",
        equation: "e = Vv / Vs",
        variables: [
          { id: "e", label: "Void Ratio (e)", unit: "" },
          { id: "Vv", label: "Volume of Voids (Vv)", unit: "m³" },
          { id: "Vs", label: "Volume of Solids (Vs)", unit: "m³" }
        ],
        calculate: ({ e, Vv, Vs }) => {
          if (e === undefined && Vv !== undefined && Vs !== undefined) return Vs===0 ? {result:"Error: Vs=0", steps:""} : { result: `e = ${(Vv/Vs).toFixed(4)}`, steps: `${Vv} / ${Vs}` };
          if (Vv === undefined && e !== undefined && Vs !== undefined) return { result: `Vv = ${(e*Vs).toFixed(4)} m³`, steps: `${e} × ${Vs}` };
        }
      }
    ]
  },
  {
    category: "Advanced Optics & Astrophysics",
    formulas: [
      {
        id: "rayleigh", name: "Rayleigh Criterion (Angular)",
        description: "Minimum angular separation at which a telescope can distinguish two point sources.",
        equation: "θ = 1.22λ / D",
        variables: [
          { id: "theta", label: "Resolution Angle (θ)", unit: "rad" },
          { id: "lambda", label: "Wavelength (λ)", unit: "nm" },
          { id: "D", label: "Aperture (D)", unit: "m" }
        ],
        calculate: ({ theta, lambda, D }) => {
          if (theta === undefined && lambda !== undefined && D !== undefined) {
            if (D === 0) return { result: "Error: D=0", steps: "" };
            const l_m = lambda * 1e-9;
            const res = 1.22 * l_m / D;
            return { result: `θ = ${res.toExponential(4)} rad`, steps: `1.22 × (${lambda}×10⁻⁹) / ${D}` };
          }
          if (D === undefined && theta !== undefined && lambda !== undefined) {
            if (theta === 0) return { result: "Error: θ=0", steps: "" };
            const l_m = lambda * 1e-9;
            const res = 1.22 * l_m / theta;
            return { result: `D = ${res.toExponential(4)} m`, steps: `1.22 × (${lambda}×10⁻⁹) / ${theta}` };
          }
        }
      },
      {
        id: "telescope-mag", name: "Telescope Magnification",
        description: "Angular magnification of a refracting telescope from objective and eyepiece focal lengths.",
        equation: "M = fo / fe",
        variables: [
          { id: "M", label: "Magnification (M)", unit: "" },
          { id: "fo", label: "Objective Focal Length (fo)", unit: "m" },
          { id: "fe", label: "Eyepiece Focal Length (fe)", unit: "m" }
        ],
        calculate: ({ M, fo, fe }) => {
          if (M === undefined && fo !== undefined && fe !== undefined) return fe===0 ? {result:"Error: fe=0", steps:""} : { result: `M = ${(fo/fe).toFixed(2)}x`, steps: `${fo} / ${fe}` };
          if (fo === undefined && M !== undefined && fe !== undefined) return { result: `fo = ${(M*fe).toFixed(4)} m`, steps: `${M} × ${fe}` };
          if (fe === undefined && M !== undefined && fo !== undefined) return M===0 ? {result:"Error: M=0", steps:""} : { result: `fe = ${(fo/M).toFixed(4)} m`, steps: `${fo} / ${M}` };
        }
      },
      {
        id: "distance-modulus", name: "Distance Modulus",
        description: "Relationship between apparent magnitude, absolute magnitude, and distance in parsecs.",
        equation: "m - M = 5 log₁₀(d) - 5",
        variables: [
          { id: "mu", label: "Modulus (m - M)", unit: "" },
          { id: "d", label: "Distance (d)", unit: "pc" }
        ],
        calculate: ({ mu, d }) => {
          if (mu === undefined && d !== undefined) {
            if (d <= 0) return { result: "Error: Distance must be > 0", steps: "" };
            const res = 5 * Math.log10(d) - 5;
            return { result: `m - M = ${res.toFixed(2)}`, steps: `5 × log₁₀(${d}) - 5` };
          }
          if (d === undefined && mu !== undefined) {
            const res = Math.pow(10, (mu + 5) / 5);
            return { result: `d = ${res.toExponential(4)} pc`, steps: `10^((${mu} + 5) / 5)` };
          }
        }
      },
      {
        id: "wiens-law", name: "Wien's Displacement Law",
        description: "Peak wavelength of blackbody radiation is inversely proportional to temperature.",
        equation: "λmax = b / T",
        variables: [
          { id: "lambda", label: "Peak Wavelength (λ)", unit: "nm" },
          { id: "T", label: "Temperature (T)", unit: "K" }
        ],
        calculate: ({ lambda, T }) => {
          const b = 2.897771955e-3; // m.K
          if (lambda === undefined && T !== undefined) {
            if (T === 0) return { result: "Error: T=0", steps: "" };
            const res = (b / T) * 1e9; // to nm
            return { result: `λ = ${res.toFixed(2)} nm`, steps: `(2.897×10⁻³ / ${T}) × 10⁹` };
          }
          if (T === undefined && lambda !== undefined) {
            if (lambda === 0) return { result: "Error: λ=0", steps: "" };
            const res = b / (lambda * 1e-9);
            return { result: `T = ${res.toFixed(2)} K`, steps: `2.897×10⁻³ / (${lambda}×10⁻⁹)` };
          }
        }
      },
      {
        id: "lens-maker", name: "Lens Maker's Equation",
        description: "Focal length of a thin lens from its refractive index and radii of curvature.",
        equation: "1/f = (n-1)(1/R₁ - 1/R₂)",
        variables: [
          { id: "f", label: "Focal Length (f)", unit: "m" },
          { id: "n", label: "Refractive Index (n)", unit: "" },
          { id: "R1", label: "Radius 1 (R₁)", unit: "m" },
          { id: "R2", label: "Radius 2 (R₂)", unit: "m" }
        ],
        calculate: ({ f, n, R1, R2 }) => {
          if (f === undefined && n !== undefined && R1 !== undefined && R2 !== undefined) {
            if (R1 === 0 || R2 === 0) return { result: "Error: R1 or R2 is 0", steps: "" };
            const invF = (n - 1) * (1 / R1 - 1 / R2);
            if (invF === 0) return { result: "Error: 1/f = 0 (infinite f)", steps: "" };
            return { result: `f = ${(1/invF).toFixed(4)} m`, steps: `1/f = (${n}-1)×(1/${R1} - 1/${R2})` };
          }
        }
      },
      {
        id: "larmor", name: "Larmor Formula",
        description: "Power radiated by an accelerating charged particle in classical electrodynamics.",
        equation: "P = 2kq²a² / (3c³)",
        variables: [
          { id: "P", label: "Radiated Power (P)", unit: "W" },
          { id: "q", label: "Charge (q)", unit: "C" },
          { id: "a", label: "Acceleration (a)", unit: "m/s²" }
        ],
        calculate: ({ P, q, a }) => {
          const c = 299792458;
          const k = 8.9875517923e9; // Coulomb constant 1/(4πε0)
          if (P === undefined && q !== undefined && a !== undefined) {
            const res = (2 * k * Math.pow(q, 2) * Math.pow(a, 2)) / (3 * Math.pow(c, 3));
            return { result: `P = ${res.toExponential(4)} W`, steps: `(2k × ${q}² × ${a}²) / (3c³)` };
          }
        }
      }
    ]
  }
];
