//Toggle Report Option 

export default function TabToggle({
  activeTab,
  onReadabilityTabClick,
  onAccessibilityTabClick,
  onContinuityTabClick,
}) {
  return (
    <div className="bg-black rounded-full p-1 flex">
      <button
        onClick={onAccessibilityTabClick}
        className={`flex-1 text-center rounded-full py-2 px-4 ${
          activeTab === 'accessibility' ? 'bg-gray-500 text-white' : 'bg-black'
        }`}
      >
        Accessibility
      </button>
      <button
        onClick={onReadabilityTabClick}
        className={`flex-1 text-center rounded-full py-2 px-4 ${
          activeTab === 'readability' ? 'bg-gray-500 text-white' : 'bg-black'
        }`}
      >
        Readability
      </button>
      <button
        onClick={onContinuityTabClick}
        className={`flex-1 text-center rounded-full py-2 px-4 ${
          activeTab === 'continuity' ? 'bg-gray-500 text-white' : 'bg-black'
        }`}
      >
        Continuity
      </button>
    </div>
  );
}
