# Catatan Penting
Setiap kali kalian mau lanjut kerja, sebelum mulai selalu jalanin `git pull origin main` biar local project kalian up to date sama repo ini

# Tutorial clone repo ini ke device kalian masing" (local project) biar bisa kerja
1. Jalanin command ini di folder yg bakal nampung projectnya `git clone https://github.com/Shardium/webprog-final-project.git`
2. Kalo berhasil, bakal muncul folder `webprog-final-project`, tinggal buka VS Code dalam foldernya seperti biasa
3. Di terminal atau cmd prompt, jalanin `npm install` & `composer install`, ini buat install semua dependency di local project kalian
    > **NOTE:** Pastikan command di atas di run DALAM diretory `webprog-final-project` biar gk error
    > <img width="941" height="46" alt="image" src="https://github.com/user-attachments/assets/fe7db1ea-258d-4e9d-b2f3-a74ed6e37a41" />
    > **NOTE2:** Mungkin pas jalanin `npm install` muncul _2 **moderate** severity vulnerabilities_. Aku gk tau kenapa begitu tp harusnya aman
4. Buat jalanin projectnya: `npm run dev` & `php artisan serve`

## ERD
<img width="922" height="628" alt="image" src="https://github.com/user-attachments/assets/ec02ab79-9e6d-4766-9ded-a27779e3e99e" />

