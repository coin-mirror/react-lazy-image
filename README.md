# React Lazy-Load Image

Lazy-loading images, only when they are visible can be hard. That's what the simple compentent is for.

**Features:**

- Loading Images when visable
- TailwindCSS support and adjustable styles
- Support for Blurhash
- Support for Blur Data URL (URL to Image or Bash64 or else)
- Typescript (native) support

> This project is already used in production projects, but still it may not be perfect, yet. Every pull-request is welcome, also for test implementations.

## Usage

```typescript
// your-image.tsx => Your React component
import LazyImage from "react-lazy-image";

function YourReactImageComponent() {
  return (
    <LazyImage
      src="https://images.unsplash.com/photo-1729508895264-d61e3f6587fa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D"
      srcset="https://images.unsplash.com/photo-1729508895264-d61e3f6587fa?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D 100w, https://images.unsplash.com/photo-1729508895264-d61e3f6587fa?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D 200w, https://images.unsplash.com/photo-1729508895264-d61e3f6587fa?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D 300w"
      blurDataURL="data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAAQSUAQykARi8ASS0ARxkUQAAZMgANIQAAPEkIQU8OSlkcUFwtTlM5Qjs7LAcvAAATP2IqR2otVXY3XntFW3NRTF1SMD9FAB0sUXI4WXo7Z4dFb4xUbINfXm1gRVJUJzk/aXk/cIBDe4tNgo9bf4VlcnBmYFZdT0BOgHlAhX5FjodQk4hcj31lhWhnd1BibD5ZkHc/k3pFmn9Qnn1bmnFjkVxlh0ZjfzhglXY/mHhEn3tQonhanmthllZkjEJkhTVi"
      style={{
        width: 300,
        height: 200,
      }}
      alt="green & violet aurora | Author: Jonny Gios @ Unsplash"
      title="green & violet aurora on star night"
      wrapperClassName="rounded-lg"
      className="object-center object-cover"
      unloadedClassName="animate-pulse"
    />
  );
}
```

## Development

To install dependencies:

```bash
bun install
```
