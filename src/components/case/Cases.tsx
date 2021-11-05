import Image from "next/image"

interface CaseProps {
  id: string
  caseName: string
  caseType: string
  caseBody: string
  caseImg: string
  caseLogo1: string
  caseLogo2: string
}

const CaseContent = ({
  id,
  caseName,
  caseType,
  caseBody,
  caseImg,
  caseLogo1,
  caseLogo2,
}: CaseProps) => {
  return (
    <div id={id}>
      <p>{caseName}</p>
      <p>{caseType}</p>
      <p>{caseBody}</p>
      {caseImg && (
        <div style={{ position: "relative", width: "100%", height: 150 }}>
          <Image
            src={caseImg}
            layout="fill"
            objectFit="contain"
            alt={caseName}
          />
        </div>
      )}
      {caseLogo1 && (
        <div style={{ position: "relative", width: "100%", height: 150 }}>
          <Image
            src={caseLogo1}
            layout="fill"
            objectFit="contain"
            alt={caseName}
          />
        </div>
      )}
      {caseLogo2 && (
        <div style={{ position: "relative", width: "100%", height: 150 }}>
          <Image
            src={caseLogo2}
            layout="fill"
            objectFit="contain"
            alt={caseName}
          />
        </div>
      )}
    </div>
  )
}

export default CaseContent
