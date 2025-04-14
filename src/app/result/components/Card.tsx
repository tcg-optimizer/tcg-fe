interface CardProps {
  children?: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="aspect-[2/3] bg-red-500 border-red-500 border-2 rounded-lg p-4">
      <div>{children}</div>
    </div>
  );
}
