🎮 Project: Find Your Hat  🐱 & 💗

## 🏗️ Architecture & Design Patterns
* **Encapsulation**: ใช้ **Private Class Fields (`#`)** เพื่อทำ Data Hiding ป้องกันไม่ให้สถานะภายในเกม (เช่น พิกัดแมว) ถูกแก้ไขจากภายนอกโดยตรง 🛡️
* **Static Factory Method**: `generateField()` ทำหน้าที่เป็นโรงงานสร้าง Object (Factory Pattern) ช่วยแยก Logic การสร้างด่าน (Creation) ออกจาก Logic การเล่น (Behavior) 🏭
* **Asynchronous Flow**: ใช้ `readline/promises` ร่วมกับ **Async/Await** เพื่อจัดการ User Input แบบ non-blocking ทำให้ Program ไม่ค้างขณะรอรับคำสั่ง ⏳

## 🕹️ Core Game Logic
1.  **State Management**: ใช้ **2D Array** แทนระบบพิกัด Cartesian โดยอ้างอิงแบบ `[row][col]` หรือ `[y][x]` 📍
2.  **Collision Detection**: ทุกครั้งที่มีการ Move โปรแกรมจะตรวจสอบเงื่อนไข (Boundary & Content Check):
    * **Out of Bounds**: เช็กว่าดัชนี Array ติดลบหรือเกินขนาดที่กำหนดหรือไม่ 🚫
    * **Element Check**: ตรวจสอบค่าในช่องเป้าหมายว่าคือ `👹` (Hole) หรือ `💗` (Hat) 🎯
3.  **Game Loop**: รันลูปด้วยเงื่อนไข `#isPlaying` และใช้ `console.clear()` เพื่อทำ **Re-rendering** ให้ UI บน Terminal ดูลื่นไหล 🔄

🛠️ Data Structure & Assets
| Object | Representation | Technical Role |
| :--- | :---: | :--- |
| **Player** | `🐱` | Current Coordinate Pointer |
| **Target** | `💗` | Win Condition Trigger |
| **Obstacle** | `👹` | Game Over Condition (Trap) |
| **Field** | `⬜` | Empty Node in Grid |

🚀 Execution Strategy
* **Error Handling**: ครอบด้วย `try...finally` เพื่อการทำ **Clean-up Phase** คือการปิด `Interface` ของ Readline เสมอ ไม่ว่าเกมจะจบด้วยการ Error หรือการเล่นปกติ เพื่อป้องกัน Memory Leak 🧹
* **Randomization**: ใช้ `Math.random()` ร่วมกับ `do...while` ในการสุ่มวางไอเทม เพื่อการันตีว่า `💗` และ `🐱` จะไม่เกิดซ้อนทับกันตั้งแต่เริ่มเกม 🎲

