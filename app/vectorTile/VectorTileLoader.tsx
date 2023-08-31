import Protobuf from 'pbf';
import { VectorTile } from '@mapbox/vector-tile';
import React from 'react';

async function loadVectorTile(url: string): Promise<VectorTile> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return new VectorTile(new Protobuf(buffer));
}

function useVectorTileLoader(url: string): VectorTile | null {
  const [tile, setTile] = React.useState<VectorTile | null>(null);

  React.useEffect(() => {
    loadVectorTile(url)
      .then(loadedTile => {
        setTile(loadedTile);
        console.log(loadedTile);
      });
  }, [url]);

  return tile;
}

function VectorTileLoader(props: {url: string}) {
  const tile = useVectorTileLoader(props.url);

  if (!tile) {
    return <p className="text-white">Loading...</p>;
  }

  return <p className="text-white">Loaded, see console log for loaded tile!</p>;
}

export default VectorTileLoader
export {useVectorTileLoader}