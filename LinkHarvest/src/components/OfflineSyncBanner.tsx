import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SyncQueueItem } from '../types';

interface Props {
  isOffline: boolean;
  syncQueue: SyncQueueItem[];
  onTriggerSync: () => void;
  onToggleOffline: () => void;
}

export const OfflineSyncBanner: React.FC<Props> = ({
  isOffline,
  syncQueue,
  onTriggerSync,
  onToggleOffline,
}) => {
  if (!isOffline && syncQueue.length === 0) return null;

  return (
    <div className="w-full bg-[#FAF8F5] border-b border-[#E5DFD3] px-4 py-2 text-xs transition-all">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isOffline ? (
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C86D51] text-white font-bold text-[11px]">
              <WifiOff className="w-3.5 h-3.5" />
              Offline Mode Active
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2D6A4F] text-white font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Connected
            </span>
          )}

          <span className="text-stone-700">
            {isOffline
              ? 'Changes are safely preserved in local storage cache.'
              : 'Online connection restored.'}
          </span>

          {syncQueue.length > 0 && (
            <span className="bg-[#FFE8D6] text-[#9D4D15] border border-[#F4A261] px-2 py-0.5 rounded-md font-bold text-[11px]">
              {syncQueue.length} {syncQueue.length === 1 ? 'item' : 'items'} in Sync Queue
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {syncQueue.length > 0 && (
            <button
              onClick={onTriggerSync}
              disabled={isOffline}
              className="px-3 py-1 bg-[#2D6A4F] hover:bg-[#1B4332] disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-1 text-[11px] shadow-xs"
            >
              <RefreshCw className="w-3 h-3" />
              Sync Queue Now
            </button>
          )}

          <button
            onClick={onToggleOffline}
            className="px-2.5 py-1 text-stone-600 hover:text-stone-900 bg-white border border-[#E5DFD3] rounded-lg font-medium text-[11px]"
          >
            {isOffline ? 'Go Online' : 'Simulate Offline'}
          </button>
        </div>
      </div>
    </div>
  );
};
