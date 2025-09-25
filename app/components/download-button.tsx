import { toPng } from "html-to-image";
import { useState } from "react";

type DownloadButtonProps = {
  selector?: string;
  filename?: string;
  className?: string;
};

export const DownloadButton = ({
  selector = ".blobby-preview",
  filename = "blobby",
  className = "",
}: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Target the blobby-preview directly
      const blobbyElement = document.querySelector(selector) as HTMLElement;
      if (!blobbyElement) {
        console.error("Element not found:", selector);
        return;
      }

      // Create a container with more height for hats
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "200px";
      container.style.height = "250px"; // More height for hats
      container.style.padding = "40px 25px 25px 25px"; // More top padding
      container.style.backgroundColor = "transparent";
      container.style.zIndex = "-9999";
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";

      // Clone and append the blobby
      const clonedBlobby = blobbyElement.cloneNode(true) as HTMLElement;
      clonedBlobby.style.position = "relative";
      container.appendChild(clonedBlobby);
      document.body.appendChild(container);

      // Wait for styles to be applied
      await new Promise(resolve => setTimeout(resolve, 100));

      // Export with dimensions that accommodate hats
      const dataUrl = await toPng(container, {
        width: 250,  // 200 + 50 horizontal padding
        height: 315, // 250 + 65 vertical padding
        pixelRatio: 2,
        backgroundColor: "transparent",
        cacheBust: true,
      });

      // Clean up
      document.body.removeChild(container);

      // Download the image
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${filename}.png`;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);

      // Fallback to simpler approach
      try {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          const dataUrl = await toPng(element, {
            pixelRatio: 2,
            backgroundColor: "transparent",
            cacheBust: true,
          });

          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${filename}.png`;
          link.click();
        }
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`download-button ${className}`}
      aria-label="Download blobby as PNG"
    >
      {isDownloading ? (
        <span>Downloading...</span>
      ) : (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="download-icon"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download PNG</span>
        </>
      )}
    </button>
  );
};