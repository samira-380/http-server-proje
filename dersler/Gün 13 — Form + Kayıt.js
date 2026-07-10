Gün 13 — Form + Kayıt

--Uncontrolled component: Input'un değerini DOM kendi tutar, React'in haberi olmaz. Değeri okumak için ref kullanırsın.React'te kontrolsüz bileşen, form öğesinin durumunun doğrudan React tarafından kontrol edilmediği bir bileşeni ifade eder . Bunun yerine, form öğesi kendi durumunu korur ve React, öğeyle yalnızca referanslar (ref'ler) aracılığıyla dolaylı olarak etkileşim kurar.

const inputRef = useRef();
<input ref={inputRef} />
// Değeri okumak için: inputRef.current.value

--Controlled component: IReact'te kontrollü bir bileşen , durumu React'in kendisi tarafından kontrol edilen bir öğedir. Bu, bileşenin durumunun `setter` fonksiyonu kullanılarak yönetildiği useStateve yalnızca bu `setter` fonksiyonu kullanılarak güncellenebileceği anlamına gelir.

const [amount, setAmount] = useState('');
<input value={amount} onChange={(e) => setAmount(e.target.value)} />

--Form state: tek useState mi, ayrı ayrı mı?

A) Her alan için ayrı state:

const [amount, setAmount] = useState('');
const [type, setType] = useState('expense');
const [category, setCategory] = useState('');

B) Tek bir obje ile:

const [formData, setFormData] = useState({
  amount: '',
  type: 'expense',
  category: ''
});

                                     Ayrı state                                         Tek obje
Kod miktarı                      Çok alan varsa satır satır büyür                   Tek handleChange her alan için çalışır
Sıfırlama                        Her state'i tek tek sıfırlamalısın                 Tek satırda tüm objeyi sıfırlarsın
Okunabilirlik                    Az alanlı formda daha net                          Çok alanlı formda daha temiz
Performans                       Her state değişince sadece o state güncellenir     Obje her değişince tüm obje yeniden oluşturulur                                          

--event.preventDefault() neden gerekli?

HTML'de bir <form> submit edildiğinde, tarayıcının varsayılan davranışı sayfayı yeniden yüklemektir (ya da action attribute'unda belirtilen URL'e gitmektir). Bu, React'ten çok önce var olan eski web davranışı.tarayıcı formu submit ettiği anda sayfa yeniden yüklenir, React state'in tamamı sıfırlanır, hatta fetch isteği tamamlanmadan sayfa yenilenebilir (network sekmesinde isteğin "cancelled" olduğunu görebilirsin). Yani hem kullanıcı deneyimi bozulur hem de kodun çalışması garanti değildir.  Bu satır olmadan form "çalışıyor gibi görünür ama garip davranır" — bazen işe yarar bazen yaramaz, bu da hata ayıklamayı zorlaştırır.

--Liste nasıl güncellenecek?

sayfayı yenilemek (window.location.reload()) yanlış bir çözüm. Neden?

-Kullanıcı deneyimini bozar (tüm sayfa "flaş" gibi yenilenir, scroll pozisyonu kaybolur)
-Gereksiz — sadece bir liste güncellenmesi gerekirken tüm uygulamayı yeniden yüklüyorsun
-React'in var olma sebebine ters (React'in amacı DOM'u tamamen yenilemeden sadece değişen kısmı güncellemek)

Doğru yaklaşım — iki seçenek var:
Seçenek A: Tekrar fetch atmak (re-fetch)
POST işlemi başarılı olduktan sonra, TransactionTable'daki getData() fonksiyonunu tekrar çağırmak. Bu, backend'den güncel listeyi baştan çeker.
Seçenek B: State'i elle güncellemek (optimistic/local update)
POST isteğinin cevabında (response.json()) yeni eklenen transaction dönüyor zaten — bunu doğrudan mevcut listeye ekleyebilirsin:
jsxsetTransactions([...transactions, newTransaction]);

setTransactions([...transactions, newTransaction]);

Bu, ekstra bir network isteği yapmadan anında listeyi günceller.

