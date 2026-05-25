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
          const cT=T||298;
          if(E===undefined){const e=E0-(R*cT/(n*F))*Math.log(Q);return{result:`E = ${e.toFixed(4)} V`,steps:`E = ${E0}−(${R}×${cT}/(${n}×${F}))×ln(${Q}) = ${e.toFixed(4)} V`};}
          if(E0===undefined){const e0=E+(R*cT/(n*F))*Math.log(Q);return{result:`E° = ${e0.toFixed(4)} V`,steps:`E° = E+(RT/nF)ln(Q) = ${e0.toFixed(4)} V`};}
          if(Q===undefined){const ratio=(E0-E)*n*F/(R*cT);if(ratio<-700)return{result:"Error: Q too small",steps:"ln(Q) overflow."};return{result:`Q = ${Math.exp(ratio).toExponential(4)}`,steps:`ln(Q) = ${(E0-E)*n*F/(R*cT)} → Q = ${Math.exp(ratio).toExponential(4)}`};}
          if(n===undefined){const denom=(E0-E)*F/(R*cT*Math.log(Q));if(denom===0)return{result:"Error: Cannot find n",steps:"Check inputs."};return{result:`n = ${Math.abs(Math.round(denom))}`,steps:`n = ${(Math.abs(Math.round(denom)))}`};}
          if(T===undefined){const t=(E0-E)*n*F/(R*Math.log(Q));return{result:`T = ${t.toFixed(4)} K`,steps:`T = ${t.toFixed(4)} K`};}
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
  }
];
