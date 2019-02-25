//
//  GetData.h
//  ErnRunner
//
//  Created by Manoj Sharma on 23/02/19.
//  Copyright © 2019 Walmart. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <sqlite3.h>
@interface GetData : NSObject <RCTBridgeModule>
@end
@interface DBManager : NSObject <RCTBridgeModule>{
    NSString *databasePath;
}

+(DBManager*)getSharedInstance;
-(BOOL)createDB;
-(BOOL) saveData:(NSString*)registerNumber name:(NSString*)name
      department:(NSString*)department year:(NSString*)year;
-(NSArray*) findByRegisterNumber:(NSString*)registerNumber;

@end
