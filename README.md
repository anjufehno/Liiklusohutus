# Pidurdusteekonna visualiseerimine

## **Tehniline ülesanne**

### **Projekti eesmärk**
Selle projekti eesmärk on pidurdusteekonna visualiseerimine, arvestades erinevaid kiiruseid ja tee katteid. Kasutaja saab valida kiiruse ja tee tingimused ning näha, kuidas pidurdusteekond varieerub sõltuvalt nendest teguritest.

---

## **Kasutaja stsenaarium**
1. Kasutaja valib kiirusrežiimi ja tee katte tüübi.
2. Kasutaja vajutab nuppu **"Alusta liikumist"**.
3. Algab animatsioon.

---

## **Auto liikumise animatsioon**
1. Auto liikumine.
2. Tee liikumine.

### **Animatsiooni etapid:**
1. Auto alustab liikumist ja peatub täpselt ühe sekundi pärast.
2. Auto seisab paigal, kuid rattad pöörlevad kasutaja valitud kiirusel.
3. Tee koosneb eraldusjoontest, mis liiguvad vasakule vastavalt valitud kiirusele.
4. Animatsioon peatub mõneks sekundiks. Kasutaja näeb teadet: **"Juht märkab takistust enda ees."**
5. Animatsioon jätkub (tee ja auto rataste liikumine).
6. Täpselt ühe sekundi pärast animatsioon peatub ja kasutaja näeb järgmist teadet:  
   **"Umbes sekund pärast takistuse märkamist hakkab juht pidurdama. Selle ajaga läbib auto X meetrit kiirusel Y km/h."**
7. Auto rattad lõpetavad pöörlemise, tee liikumise kiirus aeglaselt väheneb nullini.

---

## **Visualiseerimise parameetrid**

1. **Tee suurus ekraanil võrreldes tegeliku teega:** 1 m = 5% ekraanist.
2. **Pidurdusteekonna valem:**  
   ```math
   S = \frac{V^2}{2 \cdot \mu \cdot g}
   ```

   **Kus:**  
   - `S` — pidurdusteekond (meetrites)  
   - `V` — kiirus m/s (`V km/h / 3.6`)  
   - `μ` — rehvide haardetegur tee pinnaga  
   - `g` — raskuskiirendus (9.81 m/s²)  

3. **Haardetegurid vastavalt tee tüübile:**  
   - **Kuiv tee** → `μ = 0.8`  
   - **Märg tee** → `μ = 0.5`  
   - **Lumega kaetud tee** → `μ = 0.25`  
   - **Jää** → `μ = 0.1`  

---

## **Allikad**
- [Pidurdusteekonda valem (Wikipedia)](https://en.wikipedia.org/wiki/Braking_distance)