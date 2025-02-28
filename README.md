# **SerieslyTracked** 🎬  

Yeah, I know—most streaming platforms **already** keep track of what you're watching. So why would anyone need this?  

Well, if you're **rewatching an anime that isn't available in India** or you're switching between sources and **can’t remember where you left off**, you might end up watching **2-3 episodes again just to figure it out** (been there, done that 😭).  

So, I made this **simple, no-nonsense tracker** to just **log my progress manually** without relying on any platform.  

🔗 **Live Demo:** [SerieslyTracked](https://seriesly-tracked.netlify.app/)  

## **Why I Made This**  
- I don’t need **watchlist recommendations** or **social tracking features**, just a way to **remember my episode number**.  
- Sometimes I watch shows from **multiple sources** (cough *"not on Netflix"* cough).  
- Works great for **rewatches** where streaming platforms don’t always keep progress.  

## **Features**  
✔ **Search & Add** movies/shows (via API or manually)  
✔ **Track Progress** (update seasons/episodes easily)  
✔ **Mark as Completed** (greys out & disables controls)  
✔ **Local Storage Support** (keeps data saved)  
✔ **Minimal UI** with dark mode  

## **Tech Stack**  
- **Frontend:** React, Tailwind CSS, DaisyUI   
- **Storage:** Local Storage  
- **API:** OMDb API (Movies), TVMaze API (Series)  

## **Setup & Usage**  

### **1️⃣ Install Dependencies**  
```sh
npm install
```

### **2️⃣ Start Development Server**  
```sh
npm run dev
```

### **3️⃣ Build for Production**  
```sh
npm run build
```

### **4️⃣ Deploy on Netlify**  
I’m hosting it on Netlify, so if I ever need to re-deploy:  
- Drag the `dist` folder to [Netlify](https://app.netlify.com/)  
- Or use GitHub with:  
  - **Build Command:** `npm run build`  
  - **Publish Directory:** `dist`  

## **📜 License**  
This is just a personal project, but if you somehow find it useful, feel free to use it. **MIT License.**  

---

_Is this the most practical app? Probably not. But hey, it solves an oddly specific problem for me._ 😆  
