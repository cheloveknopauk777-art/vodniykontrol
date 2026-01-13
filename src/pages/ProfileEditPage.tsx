import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, MapPin, CreditCard, Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Address {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: "card" | "sbp";
  last4?: string;
  name: string;
  isDefault: boolean;
}

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("Александр");
  const [lastName, setLastName] = useState("Иванов");
  const [email, setEmail] = useState("alex@example.com");
  const [phone, setPhone] = useState("+7 (999) 123-45-67");
  
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", name: "Дом", address: "ул. Пушкина, д. 10, кв. 25, Москва", isDefault: true },
    { id: "2", name: "Офис", address: "ул. Ленина, д. 5, офис 301, Москва", isDefault: false },
  ]);
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", type: "card", last4: "4242", name: "Visa", isDefault: true },
    { id: "2", type: "sbp", name: "СБП", isDefault: false },
  ]);

  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [newAddressName, setNewAddressName] = useState("");
  const [newAddressValue, setNewAddressValue] = useState("");

  const handleSaveProfile = () => {
    toast.success("Профиль сохранён");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success("Адрес по умолчанию изменён");
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast.success("Адрес удалён");
  };

  const handleAddAddress = () => {
    if (newAddressName && newAddressValue) {
      const newAddr: Address = {
        id: Date.now().toString(),
        name: newAddressName,
        address: newAddressValue,
        isDefault: false
      };
      setAddresses(prev => [...prev, newAddr]);
      setNewAddressName("");
      setNewAddressValue("");
      setEditingAddress(null);
      toast.success("Адрес добавлен");
    }
  };

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
    toast.success("Способ оплаты по умолчанию изменён");
  };

  const handleDeletePayment = (id: string) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    toast.success("Способ оплаты удалён");
  };

  return (
    <div className="min-h-screen hero-gradient pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <button 
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>
        <h1 className="text-2xl font-bold text-foreground">Редактировать профиль</h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Personal Info */}
        <div className="glass-card p-5 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-semibold text-foreground">Личные данные</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Введите имя"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Введите фамилию"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input 
                id="phone" 
                type="tel"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            
            <Button onClick={handleSaveProfile} className="w-full">
              Сохранить изменения
            </Button>
          </div>
        </div>

        {/* Addresses */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-semibold text-foreground">Адреса доставки</h2>
            </div>
            <button 
              onClick={() => setEditingAddress("new")}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div 
                key={addr.id} 
                className={`p-4 rounded-xl border transition-colors ${
                  addr.isDefault ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{addr.name}</span>
                      {addr.isDefault && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                          По умолчанию
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{addr.address}</p>
                  </div>
                  <div className="flex gap-2">
                    {!addr.isDefault && (
                      <button 
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Check className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {editingAddress === "new" && (
              <div className="p-4 rounded-xl border border-primary bg-primary/5 space-y-3">
                <Input 
                  value={newAddressName}
                  onChange={(e) => setNewAddressName(e.target.value)}
                  placeholder="Название (Дом, Офис...)"
                />
                <Input 
                  value={newAddressValue}
                  onChange={(e) => setNewAddressValue(e.target.value)}
                  placeholder="Полный адрес"
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditingAddress(null)} className="flex-1">
                    Отмена
                  </Button>
                  <Button onClick={handleAddAddress} className="flex-1">
                    Добавить
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-semibold text-foreground">Способы оплаты</h2>
            </div>
            <button 
              onClick={() => toast.info("Добавление карты...")}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <div 
                key={pm.id} 
                className={`p-4 rounded-xl border transition-colors ${
                  pm.isDefault ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      {pm.type === "card" ? (
                        <CreditCard className="w-5 h-5 text-foreground" />
                      ) : (
                        <span className="text-sm font-bold text-primary">СБП</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {pm.type === "card" ? `${pm.name} •••• ${pm.last4}` : pm.name}
                        </span>
                        {pm.isDefault && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                            По умолчанию
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!pm.isDefault && (
                      <button 
                        onClick={() => handleSetDefaultPayment(pm.id)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Check className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeletePayment(pm.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
