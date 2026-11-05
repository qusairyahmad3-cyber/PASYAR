import { useState } from 'react';
import { X, CheckCircle, Wallet, Building2, ArrowDownCircle } from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onWithdrawSuccess: (amount: number) => void;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  balance,
  onWithdrawSuccess,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState<number>(balance > 0 ? balance : 0);
  const [bank, setBank] = useState('Bank Syariah Indonesia (BSI)');
  const [accountNumber, setAccountNumber] = useState('7123456789');
  const [accountName, setAccountName] = useState('Koperasi Ponpes At-Toybah');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || amount > balance) return;
    onWithdrawSuccess(amount);
    setIsDone(true);
  };

  const handleClose = () => {
    setIsDone(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-teal-700 tracking-wider uppercase">Saldo Usaha Santri</span>
            <h2 className="text-base font-bold text-slate-900">Tarik Saldo Penjualan</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Permintaan Penarikan Berhasil!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Dana sebesar <strong className="text-slate-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)}</strong> telah ditransfer ke rekening {bank}.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Current Balance Box */}
            <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-[11px]">Saldo Dapat Ditarik:</span>
                <p className="text-lg font-extrabold text-teal-900 tabular-nums">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(balance)}
                </p>
              </div>
              <Wallet className="w-8 h-8 text-teal-700/60" />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nominal Penarikan (Rp) *
              </label>
              <input
                type="number"
                required
                min={10000}
                max={balance}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Rekening Tujuan (Bank Syariah) *
              </label>
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden bg-white"
              >
                <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
                <option value="Bank Muamalat">Bank Muamalat Indonesia</option>
                <option value="BCA Syariah">BCA Syariah</option>
                <option value="Bank Jabar Banten Syariah">BJB Syariah</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nomor Rekening *
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nama Pemilik Rekening *
              </label>
              <input
                type="text"
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={amount <= 0 || amount > balance}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <ArrowDownCircle className="w-4 h-4" />
                <span>Konfirmasi Tarik Saldo</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
