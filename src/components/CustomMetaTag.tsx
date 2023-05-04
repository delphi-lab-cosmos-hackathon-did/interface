export interface CustomMetaTagProps {
  title: string
  description: string
}
export const CustomMetaTag: React.FC<CustomMetaTagProps> = (props) => {
  return (
    <>
      <meta itemProp="name" content={props.title} />
      <meta itemProp="description" content={props.description} />

      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
    </>
  )
}
