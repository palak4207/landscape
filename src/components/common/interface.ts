import { ReactNode } from "react";

export interface IAuthContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IProject {
  _id: string;
  projectName: string;
  clientName: string;
  city: string;
  area: string;
  year: string;
  bannerImage: string;
  tags: [
    {
      tagName: string;

      images: [
        {
          url: [];
          area: string;
          materialUsed: string;
        }
      ];
    }
  ];
}

// interface IProjects {
//   _id: string;
//   projectName: string;
//   clientName: string;
//   bannerImage: string;
//   images: [{ string: string }];
//   city: string;
//   area: string;
//   year: string;
// }

export interface IProjectImage {
  tag: string;
  url: [];
}

export interface ITeamInfo {
  _id: string;
  name: string;
  designation: string;
  imageUrl: string;
}
